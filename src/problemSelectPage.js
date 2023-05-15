import './App.css';
import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import dummy from './dummyData.json';


const BottomContainer = styled.span`
  width: 100%;
  height: 500px;  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 5%;
  margin-top: 10%;
`;
const ProblemContainer = styled.div`
  width: 560px;
  margin-left: 90px;
  margin-top: 20px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProblemTitle = styled.h1`
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
  margin-top: 7%;
  background-color: #ece759;
  color: #3c578d;
  font-size: 20px;
  font-family: "Jamsil";
  cursor: pointer;
  border-radius: 8px;
`;
function Problems() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
      navigate("/Login");
  };

  const navigateToLevels = () => {
      navigate("/Levels");
  };

  const [form, setForm] = useState();

  const handleClick = (e) => {
    const { level } = e.target;
    setForm(level);
  };

  const Login = (e) => {
    e.preventDefault();
    console.log(form);
    // navigate("/");
  };
  /*
  function getURLParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }
  let level;
  let levelElement;
  document.addEventListener('DOMContentLoaded', function () {
    level = getURLParameter('level');
    levelElement = document.getElementById('level');
  });
  */

  const levels = 'Hard';
  const levelList = dummy.problems.filter(level => (level.level === levels));

  return (
    <div className="App">
      <header className='App-header'>
        <BannerContainer>
          <BannerTitle>⚡F-Killer</BannerTitle>
          <BannerSubTitle>온라인 디버깅 교육 플랫폼</BannerSubTitle>
          <BannerLogoutBtn onClick={navigateToLogin}>Jack &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;  Log Out</BannerLogoutBtn>
          <BannerLevelBtn onClick={navigateToLevels}> Levels </BannerLevelBtn>
        </BannerContainer>
        <BottomContainer>
          <ProblemContainer>
            <ProblemTitle>Problems</ProblemTitle>
            {levelList.map(problems => (
              <ProblemFormBtn key={problems.id}>{problems.level} - {problems.number}</ProblemFormBtn>
              ))}
          </ProblemContainer>
        </BottomContainer>
    </header>
    </div>
  );
}


export default Problems;