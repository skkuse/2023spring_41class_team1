import './App.css';
import styled from "styled-components";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
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



function Levels() {
  /*
  const { pathname } = useLocation();
  
  const { data: userCourses } = useQuery(
    "getUserCourses",
    () => getUserCourses("nickel"),
    {
      onSuccess: (data) => {
        // Object.entries(data).map(([key, value]) => console.log(key, value));
      },
      onError: (error) => {
        alert(
          "데이터를 읽어오는 과정에서 문제가 생겼습니다. 프로그램을 다시 실행해주세요."
        );
      },
      // enabled: user.courses.length > 0,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );*/

  const navigate = useNavigate();
  
  const navigateToLogin = () => {
    navigate("/Login");
  };

  const navigateToMain = () => {
    navigate("/");
  };

  
  const [form, setForm] = useState();

  /*const handleClick = (e) => {
    const { level } = e.target;
    setForm(level);
  };*/

  const Level = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="App">
      <header className="App-header">
        <BannerContainer>
          <BannerTitle onClick={navigateToMain}>⚡F-Killer</BannerTitle>
          <BannerSubTitle>온라인 디버깅 교육 플랫폼</BannerSubTitle>
          <BannerLogoutBtn onClick={navigateToLogin}>Jack &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;  Log Out</BannerLogoutBtn>
        </BannerContainer>
        <BottomContainer>
          <LevelContainer>
            <LevelTitle>Level</LevelTitle>
            <LevelForm onSubmit={Level}>
              {dummy.levels.map(levels => (
                <Link to={`/Problems/${levels.level}`} >
                  <LevelFormBtn key={levels.id}>{levels.level}</LevelFormBtn>
                </Link>
              ))}
            </LevelForm>
          </LevelContainer>
        </BottomContainer>
    </header>
    </div>
  );
}


export default Levels;