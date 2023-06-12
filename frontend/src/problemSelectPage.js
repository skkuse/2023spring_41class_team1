import './App.css';
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import dummy from './dummyData.json';
import axios from 'axios';

const BottomContainer = styled.span`
  width: 100%;
  height: 500px;  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 5%;
`;
const ProblemContainer = styled.div`
  width: 560px;
  margin-left: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ExplainContainer = styled.div`
  width: 350px;
  height: 350px;
  margin-left: 100px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Jamsil";
  border: 3px solid white;
`;

const Table = styled.h1`
  font-size: 30px;
`
const ProblemTitle = styled.h1`
  width: 100%;
  height: 100%;
  text-align: center;
  color: white;
  font-family: "Jamsil";
  margin-bottom: 10%;
`;
const BannerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 1%;
  
`;
const BannerTitle = styled.h1`
  width: 20%;
  color: #ece759;
  text-align: left;
  display: flex;
  font-family: "Jamsil";
  align-items: flex-start;
  margin-left: 100px;
  margin-top: 4%;
`;
const BannerSubTitle = styled.h4`
  width: 40%;
  color: #ece759;
  text-align: left;
  display: flex;
  font-family: "Jamsil"; 
  margin-top: 6%;
`;
const BannerLogoutBtn = styled.h6`
  cursor: pointer;
  margin-left: 10px;
  color: #ece759;
  text-align: left;
  display: flex;
  font-family: "Jamsil";
  margin-left: 2%;
  margin-top: 7%;
`;
const BannerLevelBtn = styled.h6`
  cursor: pointer;
  width: 5%;
  color: #ece759;
  text-align: left;
  display: flex;
  font-family: "Jamsil";
  margin-left: 5%;
  margin-top: 7%;
`;
const ProblemForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProblemFormBtn = styled.button`
  width: 40%;
  height: 40px;
  margin-bottom: 7%;
  background-color: #ece759;
  color: #3c578d;
  font-size: 20px;
  font-family: "Jamsil";
  cursor: pointer;
  border-radius: 8px;

  &.seen {
    background-color: #eb9080;}

  &.correct {
    background-color: #aceb7f;
  }
`;
const api = axios.create({
  baseURL: 'http://localhost:8000'  // 백엔드 서버의 주소와 포트를 baseURL로 설정
});
//문제 페이지
function Problems() {
  //페이지 이동
  const navigate = useNavigate();

  const navigateToMain = () => {
    navigate("/");
  };

  const navigateToLogin = () => {
      navigate("/Login");
  };

  const navigateToLevels = () => {
      navigate("/Levels",{state : {id : user_id}});
  };

  const [form, setForm] = useState();
  const [currentUserNickname, setCurrentUserNickname] = useState('');

  /*
  const handleClick = (e) => {
    const { level } = e.target;
    setForm(level);
  };*/

  //url 매개변수 추출
  
  const location = useLocation();
  
  const user_id = location.state.id;
  
  const levels = location.state.value;
  
  const [response_data, setResponseData] = useState([]);
  const handleButtonClick = async () => {
    try {
      const response = await api.post('/api/data/');
      const response_data=response.data;
      setResponseData(response_data);
      
      
    } catch (error) {
      
    }
  };
  useEffect(() => {
    handleButtonClick();
  }, []);
  //levels값과 일치하는 문제들을 필터링
  const levelList = response_data.filter(level => 
    level.level === levels);
    
    
  //문제 색상 설명란
  const Explain = {data:[
    {color:"yellow", state:"unseen"},
    {color:"red", state:"seen"},
    {color:"green", state:"correct"}]
  };


  //에디터로 이동
  

  //정보 백엔드로 보낸 후 에디터 페이지로 이동
  const handleProblem = (e, number) => {
    e.preventDefault();
    
  };

  
    //onclick 실행 시 작동해야 하는 것들
  
  const onClickExecute = (e, number) => {
    handleProblem(e, number);
    try {
      const response = api.post('/api/seen/', {
        level: levels,
        number: number,
        user_id: user_id
    })}
    catch(e)
    {

    }
    navigate('/EditorPage', {state : {id : user_id, value : levels, number : number}});
  };

  //현재 사용자의 닉네임 설정
  useEffect(() => {
    setCurrentUserNickname(user_id);
  }, []);
  
  function checkStringInList(list, target) {
   
    
    if (list)
    {
      var list2 = list;
      
      if (list2.includes(target)) {
        
        return true;
      } else {
        return false;
      }
    }
    else{
      
      return false;
    }
  }
  
  return (
    <div className="App">
      <header className='App-header'>
        <BannerContainer>
          <BannerTitle onClick={navigateToMain}>⚡F-Killer</BannerTitle>
          <BannerSubTitle>온라인 디버깅 교육 플랫폼</BannerSubTitle>
          <BannerLogoutBtn onClick={navigateToLogin}>{currentUserNickname} &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;  Log Out</BannerLogoutBtn>
          <BannerLevelBtn onClick={navigateToLevels}> Levels </BannerLevelBtn>
        </BannerContainer>
        <BottomContainer>
          <ExplainContainer>
                {Explain.data.map(explain => (
                  <Table
                  key={explain.color} >{explain.color} : {explain.state}</Table>
                ))}
          </ExplainContainer>
          <ProblemContainer>
            <ProblemTitle>Problems</ProblemTitle>
            {levelList.map(level => (
            <ProblemFormBtn 
              level={level.level} 
              key={level.id} 
              onClick={(e) => onClickExecute(e, level.number)}
              className={(checkStringInList(response_data[level.id].accuracy,user_id) === true ? "correct" : "") || (checkStringInList(response_data[level.id].seen,user_id) === true ? "seen" : "")}>
              {level.level} - {level.number}</ProblemFormBtn>
            ))}
            
          </ProblemContainer>
        </BottomContainer>
    </header>
    </div>
  );
}


export default Problems;