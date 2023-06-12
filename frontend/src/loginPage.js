import coder from './image/coder.svg';
import './App.css';
import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const BottomContainer = styled.span`
  width: 100%;
  height: 500px;  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const LoginContainer = styled.div`
  width: 560px;
  height: 430px;
  margin-right: 50px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LoginTitle = styled.h1`
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
  cursor: pointer;
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
const BannerLoginBtn = styled.h6`
  cursor: pointer;
  margin-left: 10px;
  width: 5%;
  color: #ece759;
  text-align: left;
  display: flex;
  font-family: "Jamsil";
  margin-left: 2%;
  margin-top: 7%;
`;
const BannerRegisterBtn = styled.h6`
  cursor: pointer;
  width: 5%;
  color: #ece759;
  text-align: left;
  display: flex;
  font-family: "Jamsil";
  margin-left: 5%;
  margin-top: 7%;
`;
const LoginForm = styled.form`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LoginFormInput = styled.input`
  display: block;
  width: 60%;
  height: 50px;
  margin: 8px;
  border-radius: 8px;
  font-family: "Jamsil";
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
const RegisterFormBtn = styled.button`
  width: 40%;
  height: 40px;
  margin-top: 10px;
  background-color: #ece759;
  color: #3c578d;
  font-size: 20px;
  font-family: "Jamsil";
  cursor: pointer;
  border-radius: 8px;
`;
const api = axios.create({
  baseURL: 'http://localhost:8000'  // 백엔드 서버의 주소와 포트를 baseURL로 설정
});

//로그인 기능
function Login() {
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




  //로그인 형식
  const [form, setForm] = useState({ id: "", password: "" });

  const navigateToLevels = () => {
    navigate("/Levels", {state : {id : form.id}});
  };

  //정보 백엔드로 보내기
  const handleLogin = async(e) => {
    e.preventDefault();
   
    try {
      const response = await api.post('/api/login/', {
        username: form.id,
        password: form.password,
      });
      
      alert('로그인에 성공하였습니다.');
      navigateToLevels();
    } catch (error) {
      alert('로그인에 실패했습니다.');
    } 
    

  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });}

  
    //onclick 실행 시 작동해야 하는 것들
  const onClickExecute = (e) => {
      handleLogin(e);
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <BannerContainer>
          <BannerTitle onClick={navigateToMain}>⚡F-Killer</BannerTitle>
          <BannerSubTitle>온라인 디버깅 교육 플랫폼</BannerSubTitle>
          <BannerRegisterBtn onClick={navigateToRegister}>Sign Up</BannerRegisterBtn>
          <BannerLoginBtn onClick={navigateToLogin}>Log In</BannerLoginBtn>
        </BannerContainer>
        <BottomContainer>
          <img src={coder} className="App-logo" alt="coder" />
          <LoginContainer>
            <LoginTitle>Login</LoginTitle>
            <LoginForm>
              <LoginFormInput
                type="text"
                id="id"
                name="id"
                value={form.id}
                onChange={handleChange}
                placeholder="     아이디"
              />
              <LoginFormInput
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="     비밀번호"
              />
              <LoginFormBtn onClick={onClickExecute}>로그인</LoginFormBtn>
              <RegisterFormBtn onClick={navigateToRegister}>회원가입</RegisterFormBtn>
            </LoginForm>
          </LoginContainer>
        </BottomContainer>
    </header>
    </div>
  );
}

export default Login;