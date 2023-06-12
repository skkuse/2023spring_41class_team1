import subprocess
from time import perf_counter
from io import TextIOWrapper

from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, JsonResponse
from gpt.models import Problem
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

def compile_code(request: HttpRequest):
    if request.method == 'POST':
        command = ''
        try:
            # Get essential data from request
            code = request.POST.get('user_code', '')
            user_id = request.POST.get('user_idx', '')
            problem_idx = request.POST.get('problem_idx', '')
            sample_data = Problem.objects.get(
                problem_idx=problem_idx).hidden_test_case
            command = f'{problem_idx}_{user_id}_temp'
            filename = f'{command}.c'

            # Save c code in server, temporarily
            with open(filename, 'w') as file:
                file.write(code)

            # Compile, Execution, Correct check with server-side gcc
            response = check_correct(command, sample_data)
            # DEBUG 이후 JSONRESPONSE로 교체
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "DELETE, GET, OPTIONS, PATCH, POST, PUT"
            response["Access-Control-Allow-Headers"] = "accept, accept-encoding, authorization, content-type, dnt, origin, user-agent, x-csrftoken, x-requested-with"
            return HttpResponse(response)

        except Exception as e:
            return HttpResponse(f'Error: {str(e)}', status=500)

        finally:
            # Delete temporary c code
            if command:
                subprocess.Popen(
                    ['rm', f'{command}.c', command], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    return render(request, 'compiler/compile.html')


def write_main(code: str, problem_idx: int):
    # Programmers style. run solution() function
    int_main: str = 'int main() {\n'
    # get sample_data field from Problem model
    # sample_data = Problem.objects.get(pk=problem_idx).sample_data
    sample_data = []
    numof_sample = len(sample_data)


def check_correct(command: str, sample_data: list):
    response = {
        'correct_sheet': [],
        'execution_time_sheet': [],
        'correct_rate': 0,
        'error': None,
    }
    try:
        process = subprocess.Popen(['gcc', f'{command}.c', '-o', command],
                                   stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        _, error = process.communicate()
        assert isinstance(process.stdin, TextIOWrapper)
        assert isinstance(process.stdout, TextIOWrapper)
        if error:
            raise Exception(error.decode())
        else:
            process = subprocess.Popen(
                [f'./{command}'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            for data in sample_data:
                input_data: str = data[0]
                output_data: str = data[1]

                # DEBUG: type issue, 이후 수정
                start_time = perf_counter()
                # type: ignore #.encode('utf-8'))
                process.stdin.write(input_data)
                process.stdin.flush()  # type: ignore
                output = str(process.stdout.readline())  # type: ignore
                execution_time = perf_counter() - start_time

                response['correct_sheet'].append(output == output_data)
                response['execution_time_sheet'].append(execution_time)
            response['correct_rate'] = len(response['correct_sheet']) / response['correct_sheet'].count(True)

    except Exception as e:
        response['error'] = str(e)
        return response

    return response

#### 사용자 테스트 모드 : 사용자 테스트 케이스 -> 사용자 코드 테스트 or 정답 코드 테스트 ####
### 사용자 테스트 케이스 & 사용자 코드 실행 ###
def user_code_test(request: HttpRequest):
    if request.method == 'POST':
        command = ''
        try:
            # Get essential data from request
            code = request.POST.get('user_code', '')
            sample_data = request.POST.get('testcase', '')
            command = f'user_code_test_temp'
            filename = f'{command}.c'

            # Save c code in server, temporarily
            with open(filename, 'w') as file:
                file.write(code)

            # Compile, Execution, Correct check with server-side gcc
            response = check_test_case(command, sample_data)
            # DEBUG 이후 JSONRESPONSE로 교체
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "DELETE, GET, OPTIONS, PATCH, POST, PUT"
            response["Access-Control-Allow-Headers"] = "accept, accept-encoding, authorization, content-type, dnt, origin, user-agent, x-csrftoken, x-requested-with"
            return HttpResponse(response)

        except Exception as e:
            return HttpResponse(f'Error: {str(e)}', status=500)

        finally:
            # Delete temporary c code
            if command:
                subprocess.Popen(
                    ['rm', f'{command}.c', command], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    return render(request, 'compiler/compile.html')


#### 사용자 테스트 케이스 & 정답 코드 ###
class user_testcase_test(APIView):
    def post(self, request):
    
            # Get essential data from request
        code = userproblem.objects.get(level=level, number=number)
        test_case = request.data.get('testcase')
        command = f'user_code_test_temp'
        filename = f'{command}.c'

            

        # Compile, Execution, Correct check with server-side gcc
        response = check_test_case(command, sample_data)
        # DEBUG 이후 JSONRESPONSE로 교체
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "DELETE, GET, OPTIONS, PATCH, POST, PUT"
        response["Access-Control-Allow-Headers"] = "accept, accept-encoding, authorization, content-type, dnt, origin, user-agent, x-csrftoken, x-requested-with"
        return HttpResponse(response)

        
        return render(request, 'compiler/compile.html')

##### 사용자 테스트 케이스를 받고, string 형태로 일치/불일치 테스트케이스 번호 출력 #####
def check_test_case(command: str, sample_data: list):
    response = {
        'execution_correct_result': '',
        'execution_incorrect_result': '',
    }
    try:
        process = subprocess.Popen(['gcc', f'{command}.c', '-o', command],
                                   stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        _, error = process.communicate()
        assert isinstance(process.stdin, TextIOWrapper)
        assert isinstance(process.stdout, TextIOWrapper)
        if error:
            raise Exception(error.decode())
        else:
            process = subprocess.Popen(
                [f'./{command}'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            for data_idx in range(len(sample_data)):
                data = sample_data[data_idx]
                input_data: str = data[0]
                output_data: str = data[1]

                # DEBUG: type issue, 이후 수정
                # type: ignore #.encode('utf-8'))
                process.stdin.write(input_data)
                process.stdin.flush()  # type: ignore
                output = str(process.stdout.readline())  # type: ignore
                try:
                    if output == output_data: # 사용자 테스트 케이스가 정답인 경우 -> 해당 번호 정답으로 추가
                        if len(response['execution_correct_result'])==0:
                            response['execution_correct_result'] += f'{data_idx+1}'
                        else:
                            response['execution_correct_result'] += f',{data_idx+1}'
                    else: # 사용자 테스트 케이스가 오답인 경우 -> 해당 번호 오답으로 추가
                        if len(response['execution_incorrect_result'])==0:
                            response['execution_incorrect_result'] += f'{data_idx+1}'
                        else:
                            response['execution_incorrect_result'] += f',{data_idx+1}'
                except: # process.stdin.write(input_data)에서 에러가 나기도 하나??? 이건 잘 모르겠지만 일단.. (runtime error 반영하고 싶은데..)
                    if len(response['execution_incorrect_result'])==0:
                        response['execution_incorrect_result'] += f'{data_idx+1}'
                    else:
                        response['execution_incorrect_result'] += f',{data_idx+1}'
    except: # compile 실패 경우 -> 사용자 코드가 잘못된 경우이므로 사용자 테스트 케이스는 전부 오답 처리
        for data_idx in range(len(sample_data)):
            if len(response['execution_incorrect_result'])==0:
                response['execution_incorrect_result'] += f'{data_idx+1}'
            else:
                response['execution_incorrect_result'] += f',{data_idx+1}'

    return response