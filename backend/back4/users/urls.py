from django.urls import path
from users.views import RegisterView, LoginView , LogoutView, DataListView, eval_code,SeenView,ProblemView,SaveView,ReloadView,user_testcase_test,user_code_test,submit_code

app_name = 'users'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('data/', DataListView.as_view(), name='data-list'),
    path('seen/', SeenView.as_view(), name='seen'),
    path('problem/', ProblemView.as_view(), name='problem'),
    path('save/', SaveView.as_view(), name='save'),
    path('reload/', ReloadView.as_view(), name='reload'),
    path('user_testcase_test/', user_testcase_test.as_view(), name='user_testcase_test'),
    path('user_code_test/', user_code_test.as_view(), name='user_code_test'),
    path('submit_code/', submit_code.as_view(), name='submit_code'),
    path('eval_code/', eval_code.as_view(), name='eval_code'),
] 