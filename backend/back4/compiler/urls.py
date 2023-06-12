from django.urls import path
from compiler.views import compile_code,user_code_test,user_testcase_test

urlpatterns = [
    path('compile_code/', compile_code.as_view(), name='compile_code'),
    path('user_code_test/', user_code_test.as_views(), name='user_code_test'),
    path('user_testcase_test/', user_testcase_test.as_views(), name='user_testcase_test')
]