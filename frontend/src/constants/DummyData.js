export const DUMMY_DATA = {
  question:
    "0보다 크거나 같은 정수 N이 주어진다. 이때, N!을 출력하는 프로그램을 작성하시오.",
  constraint:
    "첫째 줄에 정수 N(0 ≤ N ≤ 12)이 주어진다.\n첫째 줄에 N!을 출력한다.",
  testCases: [
    { input: 10, output: 3628800 },
    { input: 0, output: 1 },
  ],
  initial_code : '#include <stdio.h>    \nint main() {\n\tint N, fact=1;\n\tscanf("%d", &N);\n\tfor(int i=1; i<=N; i++) {\n\t\tfact *= i;\n\t}\n\tprintf("%d", fact);\n\treturn 0;\n}',
  execution_correct_result : '1, 2, 3',
  execution_incorrect_result : '',
  hint : "팩토리얼",
  accuracy : "accuracy is ...",
  code_readability : "code readability is ..."
};

// export const ERROR_CODE_RESULT = {
//   codeResult : 'Traceback (most recent call last): \n File "c:\projects\pylib\traceback_sample.py", line 14, in main\n b()  \nFile "c:\projects\pylib\traceback_sample.py", line 9, in b   \n a()  \n File "c:\projects\pylib\traceback_sample.py", line 5, in a \n  return 1/0 \nZeroDivisionError: division by zero',
//   codeDiff: [],
//   codeExplanation: "코드에 에러가 존재합니다.",
//   efficiency: [
//     { id: "LOC", moreInfo: [], score: 0 },
//     { id: "halstead", moreInfo: [], score: 0 },
//     { id: "CFC", moreInfo: [], score: 0 },
//     { id: "DFC", moreInfo: [], score: 0 },
//   ],
//   functionality: [
//     { id: 1, status: "fail", input: 0, output: 0, userOutput: "error" },
//     { id: 2, status: "fail", input: 0, output: 0, userOutput: "error" },
//     { id: 3, status: "fail", input: 0, output: 0, userOutput: "error" },
//     { id: 4, status: "fail", input: 0, output: 0, userOutput: "error" },
//     { id: 5, status: "fail", input: 0, output: 0, userOutput: "error" },
//   ],
//   readabilityType: [
//     { id: "eradicate", score: 0, moreInfo: [] },
//     { id: "mccabe", score: 0, moreInfo: [] },
//     { id: "mypy", score: 0, moreInfo: [] },
//     { id: "pycodestyle", score: 0, moreInfo: [] },
//     { id: "pydocstyle", score: 0, moreInfo: [] },
//     { id: "pyflakes", score: 0, moreInfo: [] },
//     { id: "pylint", score: 0, moreInfo: [] },
//     { id: "isort", score: 0, moreInfo: [] },
//   ],
// };
