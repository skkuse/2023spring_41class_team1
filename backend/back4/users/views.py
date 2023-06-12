from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout 
from .models import back4Model,userproblem
from rest_framework import status
from rest_framework import serializers
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
import subprocess
from time import perf_counter
from io import TextIOWrapper
import ctypes
from pathlib import Path
import openai
from django.http import JsonResponse

# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators import method_decorator
# @method_decorator(csrf_exempt,name='dispatch')
class UserProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = userproblem
        fields = '__all__'
class RegisterView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        password_config=request.data.get('password_config')
        if password!=password_config:
            return Response({'message': '비밀번호 불일치'})
        user = User.objects.create_user(username=username, password=password)
        user.save()
        return Response({'message': '회원가입이 완료'})



class LoginView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': '로그인이 완료되었습니다.'})
        else:
            return Response({'message': '로그인에 실패하였습니다.'}, status=400)
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': '로그아웃이 완료되었습니다.'})
class DataListView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        data = userproblem.objects.all()
        serializer = UserProblemSerializer(data, many=True)
        return Response(serializer.data)
class SeenView(APIView):
    def post(self, request):
        level=request.data.get('level')
        number=request.data.get('number')
        user_index = request.data.get('user_id')
        user_problem = userproblem.objects.get(level=level, number=number)
        seen_values = eval(str(user_problem.seen)) or []  # 기존 값이 없는 경우 빈 리스트로 초기화
        if user_index not in seen_values:
            seen_values.append(user_index)
        elif seen_values==[]:
            seen_values=[user_index]
        user_problem.seen = seen_values
        user_problem.save()
        return Response("DB 파일 수정 완료")
class ProblemView(APIView):
    def post(self, request):
        level=request.data.get('level')
        number=request.data.get('number')
        user_index = request.data.get('user_id')
        user_problem =userproblem.objects.get(level=level, number=number)
        problem=back4Model.objects.get(problem_idx=user_problem.problem_id)
        return Response({"initial_code":user_problem.error_injection_code,"question":problem.problem_comment,"constraint":problem.input_comment+"\n"+problem.output_comment,"testCases":problem.sample_data,"hint":problem.sub_level_tag})
class SaveView(APIView):
    def post(self, request):
        user_id=request.data.get('username')
        saved_code=request.data.get('saved_code')
        user=User.objects.get(username=user_id)
        user.email = saved_code  # 원하는 새 이메일로 변경
        user.save()
        return Response("good")
class ReloadView(APIView):
    def post(self, request):
        user_id=request.data.get('username')
        user=User.objects.get(username=user_id)
        return Response(user.email)
class user_testcase_test(APIView):
    def post(self, request):
        test_case = request.data.get('testcase')
        level=request.data.get('level')
        number=request.data.get('number')
        problem = userproblem.objects.get(level=level, number=number)
        code=back4Model.objects.get(problem_idx=problem.problem_id).chatGPT_output_code  
        result1,result2 = check_test_case(code, test_case)
        if result1=="error":
            return Response("error")
        else:  
            return Response({'execution_correct_result':result1,'execution_incorrect_result':result2})
class user_code_test(APIView):
    def post(self, request):
        test_case = request.data.get('testcase')
        code=request.data.get('user_code')
        result1,result2 = check_test_case(code, test_case)
        if result1=="error":
            return Response("error")
        else:
            return Response({'execution_correct_result':result1,'execution_incorrect_result':result2})
class submit_code(APIView):
    def post(self, request):
        level=request.data.get('level')
        number=request.data.get('number')
        code=request.data.get('user_code')
        user_index = request.data.get('username')
        problem = userproblem.objects.get(level=level, number=number)
        test_case=back4Model.objects.get(problem_idx=problem.problem_id).hidden_test_case
        test_case=eval(test_case)
        result1,result2 = check_test_case(code, test_case)
        if result1=="error":
            return Response({"message":"error"})
        else:
            accuracy=len(result1)/(len(result1)+len(result2))
            if accuracy==1:
                user_problem = userproblem.objects.get(level=level, number=number)
                accuracy_values = eval(str(user_problem.accuracy)) or []  # 기존 값이 없는 경우 빈 리스트로 초기화
                if user_index not in accuracy_values:
                    accuracy_values.append(user_index)
                elif accuracy_values==[]:
                    accuracy_values=[user_index]
                user_problem.accuracy = accuracy_values
                user_problem.save()
            return Response({"accuracy2":str(accuracy*100),"message":"okay"})       
def check_test_case(command: str, sample_data: list): 
    correct=[]
    wrong=[]
    result_compile=subprocess.run(["gcc", "-xc", "-", "-o", "output"], input=command, text=True)
    if result_compile.returncode!=0:
        return "error","error"
    idx=0
    for data in sample_data:
        idx+=1
        input_data = data[0]
        output_data = data[1]
        result = subprocess.run(["./output.exe"], input=input_data  , text=True, capture_output=True)
        if result.returncode != 0:
            return "error","error"
        else:
            if result.stdout==output_data:
                correct.append(idx)
            else:
                wrong.append(idx)
    return correct,wrong
def gpt_eval(code):
    assets_path = Path(__file__).resolve().parent / 'assets'
    prompt_path = assets_path / 'roleplay_prompt.txt'
    answer_path = assets_path / 'roleplay_answer.txt'
    openai.api_key = "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"
    with prompt_path.open('r') as f:
        prompt = f.read().strip()
    with answer_path.open('r') as f:
        answer = f.read().strip()
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {'role': 'user', 'content': prompt},
            {'role': 'assistant', 'content': answer},
            {'role': 'user', 'content': f'Evaluate Readability of below C langauge code and represent as a integer score. Maximum score is 100 that it is 100% perfect code aspect of readability. And Minimum score is 0 that it can be interpreted with wrong way person by person. You must represent only Integer score. Do not append any other comment or explanation. For example, "60" just only integer.\n{code}'}
        ]
    )
    return completion.choices[0].message['content'].strip()
class eval_code(APIView):
    permission_classes = (AllowAny, )
    def post(self, request):
        response = {
            'evaluation': None,
            'error': None
        }
        try:
            code = request.POST.get('code', '')
            evaluation = gpt_eval(code)
            response['evaluation'] = evaluation
        except Exception as e:
            response['error'] = str(e)
        return JsonResponse(response)