from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout 
from .models import back4Model

# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators import method_decorator
# @method_decorator(csrf_exempt,name='dispatch')

class RegisterView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        nickname = request.data.get('nickname')  

        
        user = User.objects.create_user(username=username, password=password)
        user.nickname = nickname
        user.save()
        # 필요한 추가 정보 저장
        # 닉네임 추가
        # 예시: user.profile.email = request.data.get('email')
        
        return Response({'message': '회원가입이 완료되었습니다.'})


class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # 인증
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': '로그인이 완료되었습니다.'})
        else:
            return Response({'message': '로그인에 실패하였습니다.'}, status=400)
class LogoutView(APIView):
    def post(self, request):
        # 사용자 세션 종료
        logout(request)
        return Response({'message': '로그아웃이 완료되었습니다.'})
class DataListView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        data = back4Model.objects.all().values('id')
        return Response(data)
