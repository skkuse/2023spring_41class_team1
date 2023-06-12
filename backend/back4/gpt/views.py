from time import perf_counter
from pathlib import Path

import openai
# Can adjusted with os.environ
from keyring import get_password
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpRequest, HttpResponseRedirect
from django.urls import reverse
from .models import Solution


def gpt_eval(code):
    assets_path = Path(__file__).resolve().parent / 'assets'
    prompt_path = assets_path / 'roleplay_prompt.txt'
    answer_path = assets_path / 'roleplay_answer.txt'
    # userinput_path = assets_path / 'userinput_test.txt'

    openai.api_key = "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"
    with prompt_path.open('r') as f:
        prompt = f.read().strip()
    with answer_path.open('r') as f:
        answer = f.read().strip()
    # with userinput_path.open('r') as f:
    #     user_input = f.read().strip()

    completion = openai.ChatCompletion.create(
        model='gpt-4',
        messages=[
            {'role': 'system', 'content': 'You are a helpful assistant.'},
            {'role': 'user', 'content': prompt},
            {'role': 'assistant', 'content': answer},
            {'role': 'user', 'content': f'Then Evaluate this one, too.\n {code}'}
        ]
    )
    return completion


def eval_code(request: HttpRequest):
    if request.method == 'POST':
        response = {
            'success': False,
            'evaluation': None,
            'exec_time': None,
            'error': None
        }
        start_time = perf_counter()
        try:
            user_id = request.POST.get('user_idx', '')
            problem_idx = request.POST.get('problem_idx', '')
            code = request.POST.get('code', '')
            evaluation = gpt_eval(code)
            response['success'] = True
            response['evaluation'] = evaluation
            response['exec_time'] = perf_counter()-start_time
            Solution.objects.create(
                problem_idx=problem_idx,
                user_idx=user_id,
                code=code,
                ai_rating=evaluation,
            )
        except Exception as e:
            response['exec_time'] = perf_counter()-start_time
            response['error'] = str(e)
        return JsonResponse(response)

    return render(request, 'gpt/rating.html')
