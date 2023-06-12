// import "./ViewResult.css";
import {useState, useEffect} from 'react'
import styled from "styled-components";
import {DUMMY_DATA} from "./constants/DummyData"
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResultContainer = styled.div`
  color : white;
  padding: 0;
    margin: 0;
    height: 100vh;
    background-color: #263747;
`;

const ResultTitle = styled.div`
  text-align : center;
  font-size : 80px;
`;

const ResulDetail = styled.div`
  text-align : center;
`;

const ButtonContainer = styled.div`
  text-align : center;
  // display: flex;
`;



const ResultButton = styled.button`

margin-left: 40px;
margin-right : 40px;
border: none;
cursor: pointer;
font-family: "Noto Sans KR", sans-serif;
font-size: var(--button-font-size, 1rem);
padding: var(--button-padding, 12px 16px);
border-radius: var(--button-radius, 8px);
background: var(--button-bg-color, #0d6efd);
color: var(--button-color, #ffffff);

&:hover{
  background: var(--button-hover-bg-color, #025ce2);
}

`;
function ViewResult(){
    const api = axios.create({
      baseURL: 'http://localhost:8000'  // 백엔드 서버의 주소와 포트를 baseURL로 설정
    });
    const location = useLocation();
    const user_id = location.state.id;
    const levels = location.state.value;
    const number = location.state.number;
    const code = location.state.code;
    const accuracy = location.state.accuracy;
    const [readability, setReadability] = useState('');
    const call_gpt = async(e) =>{
      try {
        const temp= await api.post('/api/eval_code/', {
          code: code
      });
      setReadability(temp.data.evaluation);
    } catch (e) {

    }
  };
  
  useEffect(() => {
      call_gpt();
  }, []);
  

    const movePage = useNavigate();

    function goHome(){
        // alert('go home');
        movePage('/Levels',{state : {id : user_id}});
    }

    function goEditor(){
      // alert('go Editor');
      movePage('/EditorPage', {state : {id : user_id, value : levels, number : number}});
    }
    


    // DUMMY_DATA.accuracy는 submit 누른 시점에서 평가 이후, 상속하도록!!!!!
    return(
        <ResultContainer>
            <ResultTitle > RESULT </ResultTitle>
            <ResulDetail><br></br>
            <br></br>
            <br></br>
            <h2>Accuracy</h2>
            <p>{accuracy}</p>
            <br></br>
            <br></br>
            <h2>Code Readability</h2>
            <p>{readability}</p>
            <br></br>
            <br></br>
            <br></br>
            <ButtonContainer>
            <ResultButton onClick={goEditor}> Go Back to Editor</ResultButton>
            <ResultButton onClick={goHome}> Go Home</ResultButton>

            </ButtonContainer>
            
            </ResulDetail>



        </ResultContainer>
        
    )
}

export default ViewResult;