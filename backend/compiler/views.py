import subprocess
from time import perf_counter
from io import TextIOWrapper

from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, JsonResponse
from gpt.models import Problem


def compile_code(request: HttpRequest):
    if request.method == 'POST':
        command = ''
        try:
            # Get essential data from request
            code = request.POST.get('user_code', '')
            user_id = request.POST.get('user_idx', '')
            problem_idx = request.POST.get('problem_idx', '')
            sample_data = Problem.objects.get(
                problem_idx=problem_idx).sample_data
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
            response['correct_rate'] = len(
                response['correct_sheet']) / response['correct_sheet'].count(True)

    except Exception as e:
        response['error'] = str(e)
        return response

    return response
