// import "./ViewResult.css";
import styled from "styled-components";
import {DUMMY_DATA} from "./constants/DummyData"
import { useNavigate } from 'react-router-dom';

const ResultContainer = styled.div`
  color : white;
  padding: 0;
    margin: 0;
    height: 100%;
    background-color: #263747;
`;

const ResultTitle = styled.div`
  text-align : center;
  font-size : 80px;
`;

const ResulDetail = styled.div`
  text-align : center;
`;



const ResultButton = styled.button`

margin: 0;
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

    const movePage = useNavigate();

    function goHome(){
        alert('go home');
        movePage('/')
    }

    return(
        <ResultContainer>
            <ResultTitle > RESULT </ResultTitle>
            <ResulDetail><br></br>
            <br></br>
            <br></br>
            <h2>Accuracy</h2>
            <p>{DUMMY_DATA.accuracy}</p>
            <br></br>
            <br></br>
            <h2>Code Readability</h2>
            <p>{DUMMY_DATA.code_readability}</p>
            <br></br>
            <br></br>
            <br></br>
            
            <ResultButton onClick={goHome}> Go Home</ResultButton>
            </ResulDetail>



        </ResultContainer>
        
    )
}

export default ViewResult;