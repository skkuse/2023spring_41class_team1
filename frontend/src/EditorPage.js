import {useState,useRef,useEffect} from 'react'
import { Editor } from '@monaco-editor/react';
import "./App.css";
import { json, useNavigate } from 'react-router-dom';
import {DUMMY_DATA} from "./constants/DummyData"
import styled from "styled-components";

const CusBody = styled.div`
padding: 0;
margin: 0;
height: 100vh;
background-color: #263747;
`;

const TestCase = styled.div`
display: flex;
justify-content: space-between;
margin-right: 5px;
margin-top: 5px;
`;

const CusButton = styled.button`

margin: 2px;
border: none;
cursor: pointer;
font-family: "Noto Sans KR", sans-serif;
font-size: var(--button-font-size, 1rem);
padding: var(--button-padding, 8px 16px);
border-radius: var(--button-radius, 8px);
background: var(--button-bg-color, #0d6efd);
color: var(--button-color, #ffffff);

&:hover{
  background: var(--button-hover-bg-color, #025ce2);
}

`;

const Navigation = styled.div`
background-color:  #142430;
display: flex;
justify-content: space-around;
padding: 7px;
`;

const TestcaseInput = styled.input`
width:30%;
`;

const TestcaseTitle = styled.div`
background-color:  #142430;
display: flex;
justify-content: space-around;
padding: 7px;
border-color: #061523;
border-style: solid;
border-width: 3px;
border-top-width: 3x;
border-right-width: 0px;
border-left-width: 0px;
`;



function EditorPage() {
  const [content,setcontent] = useState(DUMMY_DATA.initial_code);
  const [executionResult, setExecutionResult] = useState('');
  const [check,setCheck] = useState(false);

  const [testcaseState,setTestcaseState] = useState(DUMMY_DATA.testCases);

  const [inputValue, setInput] = useState('');
  const [outputValue, setOutput] = useState('');

  //page 이동 function
  const movePage = useNavigate();

  const editorRef = useRef(null);
  var savedCode = null;
  const handelEditorDidMount =(editor,monaco)=>{
    editorRef.current = editor;
  }


  //reload button
  //사용자가 해당 문제에 대하여 저장하였던 코드를 불러와 Editor에 표시한다.
  function reload(){
    // reloadCode 에 저장된 코드 text 형태로 저장
    let reloadCode = DUMMY_DATA.initial_code;

    //editor에 setValue 로 저장된 text 표시 
    editorRef.current.setValue(reloadCode);
  }

  //submit 버튼
  //submit을 하면 자동으로 코드가 저장된다.
  function submit(){
    //코드 저장
    save();

    //코드 backend에 전송
    console.log('submit')

    //result page로 이동
    movePage('/resultView');
  }

  //save button
  //editor 화면에 있는 text를 DB에 저장한다.
  function save(){
    //현재 코드 저장
    savedCode = editorRef.current.getValue();
    alert('저장되었습니다.');

    //코드 백엔드에 보내기
    console.log(savedCode);
  }

  //hint button
  //문제 유행 알려주는 기틍
  function hint(){
    var hint_txt = DUMMY_DATA.hint;
    alert(hint_txt + ' 문제 입니다!')
  }

  //useconfirm 수정 필요 x
  const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }
    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
    return confirmAction;
  };

  ////////////////// reset 기능 ///////////////////////
  const deleteConfirm = () => {
    editorRef.current.setValue(DUMMY_DATA.initial_code);
    alert("초기화했습니다.");
  }
  const cancelConfirm = () => console.log("취소했습니다.");
  const reset = useConfirm(
    "초기화하시겠습니까?",
    deleteConfirm,
    cancelConfirm
  );
  /////////////////////////////////////////////////////


  ///////////////////////// home 기능 //////////////////////
  const homecancelConfirm = () => {
    movePage('/Levels');
  }

  const homeConfirm = () => {
    localStorage.setItem("testcaseState",JSON.stringify([]));

    //현재 에디터에 있는 텍스트 savedCode에 저장
    let savedCode = editorRef.current.getValue();

    //savedCode 에 있는 텍스트 user DB에 저장

    //홈으로 돌아가는 코드 구현
    movePage('/Levels');

    // alert("** 홈으로 돌아가는 함수 구현.");
  }
  const goHome = useConfirm(
    "변경사항을 저장하시겠습니까?",
    homeConfirm,
    homecancelConfirm
  )
  ///////////////////////////////////////////////////////////


  //테스트 버튼
  //테스트 케이스마다 
  function test(){
    //현재 코드 백엔드로 보내기
    let savedCode = editorRef.current.getValue();
    let savedTestcase = testcaseState;
    console.log(savedTestcase);


    alert('코드 백엔드로 보내기');

    // 결과 받기
    let result = DUMMY_DATA.execution_result;

    //실행결과 창에 output 표시

    var correctNum = result;
    var executeresult = '정답코드로 실행한 결과\n 총 테스트 케이스 중 '+correctNum+'개 정답';

    setExecutionResult(executeresult);
    // DUMMY_DATA.testCases 의 input 과 output backend에 전달

    
  }

  function addTestcase(){
    setCheck(true);
  }

  function submitTestcase(){

    if (inputValue=='' || outputValue=='' ){
      alert('입력값 및 기댓값을 채워주세요!');
      return;
    }

    console.log(inputValue,outputValue);
    
    var newValue = {input: inputValue, output: outputValue};
    
    var temp = testcaseState;

    temp.push(newValue);

    setTestcaseState(temp);
    localStorage.setItem("testcaseState",JSON.stringify(temp));
    
    setInput('');
    setOutput('');


    setCheck(false);
  }

  const saveInputValue = event => {
    setInput(event.target.value);
    // console.log(event.target.value);
  };

  const saveOutputValue = event => {
    setOutput(event.target.value);
    // console.log(event.target.value);
  };

  //정답 코드로 테스트 실행
  function correctTest(){
    var correctNum = 5;
    var executeresult = '정답코드로 실행한 결과\n 총 테스트 케이스 중 '+correctNum+'개 정답';

    setExecutionResult(executeresult);
  }

  const handleDelete = (index) =>{
    setTestcaseState((prev) => {
      const newTestcaseState = prev.filter((prev,ind) => ind !==index);
      localStorage.setItem("testcaseState",JSON.stringify(newTestcaseState));
      return newTestcaseState;
    });
    console.log(testcaseState);

  }

  // useEffect(() => {
  //   const savedTestcase = localStorage.getItem("testcaseState");
  //   if(savedTestcase.length > 0){
  //     setTestcaseState(JSON.parse(savedTestcase));
  //   }
  //   else{
  //     console.log('hello' , DUMMY_DATA.testCases);
  //     setTestcaseState(DUMMY_DATA.testCases);
  //   }
  // })



  




  return (
    <CusBody>
      <Navigation>
        <CusButton onClick={goHome}>HOME</CusButton>
        <CusButton onClick={save}>SAVE</CusButton>
        <CusButton onClick={reload}>RELOAD</CusButton>
        <CusButton onClick={reset}> RESET</CusButton>
        <CusButton onClick={submit}>SUBMIT</CusButton>
      </Navigation>

      <div className='container'>
        <div className='left'>
          <div className='title'>
          <TestcaseTitle className='testcase'>
              <p>문제</p>
              <CusButton onClick={hint} >HINT</CusButton>
          </TestcaseTitle>
          
            <h2 className='questionDetail'>{DUMMY_DATA.question}</h2>
          </div>
          <div className='constraint'>
            <p>참조 제약 사항</p>
            <p>{DUMMY_DATA.constraint}</p>
          </div>
          <TestcaseTitle >
            <p >테스트 케이스</p>
            <CusButton onClick={addTestcase}> 테스트 케이스 추가</CusButton>
          </TestcaseTitle>
          {check && <TestCase className='testcase'>
              <TestcaseInput type='text' value={inputValue} onChange={saveInputValue} placeholder='입력값'></TestcaseInput>
              <TestcaseInput type='text' value={outputValue} onChange={saveOutputValue} placeholder='기댓값'></TestcaseInput>
              <div>
              <CusButton onClick={submitTestcase}>추가</CusButton>
              </div>
              
            </TestCase>}
          <div className='testcaseList'>
          <div className='testcaseContainer'>
            {testcaseState.map((testcaseStateDetail, index)=>(
              
              <div>
              <TestCase className='testcase'>
              <p>테스테 케이스 {index+1}</p>
              <div>
              <CusButton onClick={()=>handleDelete(index)}>삭제</CusButton>
              {/* <CusButton onClick={deleteTestcase}>삭제</CusButton> */}
              </div>
              
              </TestCase>
              <p>입력값 : {testcaseStateDetail.input}       기댓값 : {testcaseStateDetail.output} </p>
              </div>
            ))}
            <div className='flexSpacearound'>
            <CusButton onClick={test}> 현재 코드로 테스트 실행</CusButton>
            <CusButton onClick={correctTest}> 정답 코드로 테스트 실행</CusButton>
            </div>
            
          </div>
          
          

          </div>
          
        </div>
        <div className='right'>

        <Editor
          height="70%"
          width="100%"
          theme="vs-dark"
          path={"filename"}
          defaultLanguage='cpp'
          defaultValue={content}
          value={content}
          onMount={handelEditorDidMount}
        />
        <div className='executionResult'>
          <div className='executionTitleContainer'>
            <p className='executionTitle'>실행 결과</p>
          </div>
          
          <p className='executionDetail'>{executionResult}</p>
        </div>
        </div>
      
      
      </div>
    </CusBody>
    
  )
}

export default EditorPage;