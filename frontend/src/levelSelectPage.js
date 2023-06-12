import './App.css';
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import dummy from './dummyData.json';


const BottomContainer = styled.span`
  width: 100%;
  height: 500px;  
  display: flex;
  flex-direction: row;
  align-items: ceneter;
  justify-content: center;
  margin-top: 3%;
  margin-right: 5%;
`;
const LevelContainer = styled.div`
  width: 560px;
  height: 350px;
  margin-left: 90px;
  margin-top: 20px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LevelTitle = styled.h1`
  width: 100%;
  height: 10%;
  text-align: center;
  color: white;
  font-family: "Jamsil";
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
  alignitems: flex-start;
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
  margin-left: 5%;
  margin-top: 7%;
`;

const LevelForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LevelFormBtn = styled.button`
  width: 300px;
  height: 50px;
  margin-top: 10%;
  background-color: #ece759;
  color: #3c578d;
  font-size: 20px;
  font-family: "Jamsil";
  cursor: pointer;
  border-radius: 8px;
`;


//레벨 페이지
function Levels() {

  const userid_location = useLocation();
  const user_id = userid_location.state.id;

  //페이지 이동
  const navigate = useNavigate();
  
  const navigateToLogin = () => {
    navigate("/Login");
  };

  const navigateToMain = () => {
    navigate("/");
  };

  const [currentUserNickname, setCurrentUserNickname] = useState('');

  

  //정보 백엔드로 보낸 후 problem 페이지로 이동
  const handleLevel = (e, level) => {
    e.preventDefault();
    
    navigate(`/Problems/${level}`, {state : {id : user_id, value : level}});
  };
  //현재 사용자의 닉네임을 설정
  useEffect(() => {
    setCurrentUserNickname(user_id);
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <BannerContainer>
          <BannerTitle onClick={navigateToMain}>⚡F-Killer</BannerTitle>
          <BannerSubTitle>온라인 디버깅 교육 플랫폼</BannerSubTitle>
          <BannerLogoutBtn onClick={navigateToLogin}>{currentUserNickname} &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;  Log Out</BannerLogoutBtn>
        </BannerContainer>
        <BottomContainer>
          <LevelContainer>
            <LevelTitle>Level</LevelTitle>
            <LevelForm>
              {dummy.levels.map(levels => (
                <LevelFormBtn
                key={levels.id}
                onClick={(e) => handleLevel(e, levels.level)}
              >
                {levels.level}
              </LevelFormBtn>
              ))}
            </LevelForm>
          </LevelContainer>
        </BottomContainer>
    </header>
    </div>
  );
}


export default Levels;