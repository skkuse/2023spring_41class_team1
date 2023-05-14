import {useState,useRef} from 'react'
import { Editor } from '@monaco-editor/react';
import "./App.css";
import { useNavigate } from 'react-router-dom';
import {DUMMY_DATA} from "./constants/DummyData"
import styled from "styled-components";

const CusBody = styled.div`
padding: 0;
margin: 0;
height: 100%;
background-color: #263747;
`;

const TestCase = styled.div`
display: flex;
justify-content: space-between;
margin-right: 5px;
margin-top: 5px;
`;

const CusButton = styled.button`

margin: 0;
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


function EditorPage() {
  const [content,setcontent] = useState(DUMMY_DATA.initial_code);
  const [executionResult, setExecutionResult] = useState('');

  const movePage = useNavigate();

  const editorRef = useRef(null);
  var savedCode = null;
  const handelEditorDidMount =(editor,monaco)=>{
    editorRef.current = editor;
  }

  function submit(){
    console.log('submit')
    movePage('/resultView');
  }

  function save(){
    savedCode = editorRef.current.getValue();
    alert('저장되었습니다.');
    console.log(savedCode);
  }

  function execute(){

    console.log(editorRef.current.getValue());
    alert('코드 백엔드로 보내기');

    // 결과 받기
    let result = DUMMY_DATA.execution_result;
    setExecutionResult(result);

  }

  function hint(){
    var hint_txt = DUMMY_DATA.hint;
    alert(hint_txt + ' 문제 입니다!')
  }

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
  
  const homeConfirm = () => {
    editorRef.current.setValue(DUMMY_DATA.initial_code);
    alert("** 홈으로 돌아가는 함수 구현.");
  }
  const goHome = useConfirm(
    "홈으로 돌아가시겠습니까?",
    homeConfirm,
    cancelConfirm
  )

  function test(){
    execute();
    // DUMMY_DATA.testCases 의 input 과 output backend에 전달

    // backend 로부터 성공 실패 여부 testResult에 저장
    let testResult = true;


    if (testResult)
      alert('성공!');
    else
      alert('실패');
    

  }




  return (
    <CusBody>
      <Navigation>
        <CusButton onClick={goHome}>Home</CusButton>
        <CusButton onClick={save}>SAVE</CusButton>
        <CusButton onClick={reset}> ReSET</CusButton>
        <CusButton onClick={submit}>SUBMIT</CusButton>
      </Navigation>

      <div className='container'>
        <div className='left'>
          <div className='title'>
          <TestCase className='testcase'>
              <h2>문제</h2>
              <CusButton onClick={hint} >HINT</CusButton>
          </TestCase>
            <h2 className='questionDetail'>{DUMMY_DATA.question}</h2>
          </div>
          <div className='constraint'>
            <p>참조 제약 사항</p>
            <p>{DUMMY_DATA.constraint}</p>
          </div>
          <div className='testcaseTitle'>
            <p >테스트 케이스</p>
            {/* <CusButton> 테스트 케이스 추가</CusButton> */}
          </div>
          
          <div className='testcaseContainer'>
            <TestCase className='testcase'>
              <p>테스테 케이스 1</p>
              <CusButton onClick={test}>테스트</CusButton>
            </TestCase>
            <p>입력값 : {DUMMY_DATA.testCases[0].input}       기댓값 : {DUMMY_DATA.testCases[0].output} </p>
          </div>
          <div className='testcaseContainer'>
            <TestCase className='testcase'>
              <p>테스테 케이스 2</p>
              <CusButton onClick={test}>테스트</CusButton>
            </TestCase>
            <p>입력값 : {DUMMY_DATA.testCases[1].input}       기댓값 : {DUMMY_DATA.testCases[1].output} </p>
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
            <CusButton onClick={execute}>실행</CusButton>
          </div>
          
          <p className='executionDetail'>{executionResult}</p>
        </div>
        </div>
      
      
      </div>
    </CusBody>
    
  )
}

export default EditorPage;