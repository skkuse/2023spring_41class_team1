import './App.css';
import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Container = styled.span`
  width: 100%;
  height: 500px;  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1%;
  
`;
const LoginContainer = styled.div`
  width: 560px;
  height: 430px;
  margin-left: 90px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 1%;
  
`;
const Title = styled.h1`
  width: 20%;
  color: #ece759;
  text-align: left;
  display: flex;
  font-family: "Jamsil";
  alignitems: flex-start;
  margin-left: 100px;
  margin-top: 4%;
`;
const SubTitle = styled.h4`
  width: 40%;
  color: #ece759;
  text-align: left;
  display: flex;
  font-family: "Jamsil"; 
  margin-top: 6%;
`;

const LoginForm = styled.form`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LoginFormBtn = styled.button`
  width: 40%;
  height: 40px;
  margin-top: 40px;
  background-color: #ece759;
  color: #3c578d;
  font-size: 20px;
  font-family: "Jamsil";
  cursor: pointer;
  border-radius: 8px;
`;

//첫 페이지
function MainPage() {
  //페이지 이동
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/Login");
    };
    const navigateToRegister = () => {
        navigate("/Register");
    };
    const navigateToMain = () => {
        navigate("/");
    };
    
    return (
        <div className="App">
        <header className="App-header">
            <TitleContainer>
            <Title onClick={navigateToMain}>⚡F-Killer</Title>
            <SubTitle>온라인 디버깅 교육 플랫폼</SubTitle>

            </TitleContainer>
            <Container>
            <LoginContainer>
                <LoginForm>
                <LoginFormBtn onClick={navigateToLogin}>로그인</LoginFormBtn>
                <LoginFormBtn onClick={navigateToRegister}>회원가입</LoginFormBtn>
                </LoginForm>
            </LoginContainer>
            </Container>
        </header>
        </div>
    );
}

export default MainPage;