import coder from './image/coder.svg';
import './App.css';
import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const BottomContainer = styled.span`
  width: 100%;
  height: 500px;  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
`;
const RegisterContainer = styled.div`
  width: 560px;
  height: 500px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const RegisterTitle = styled.h1`
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RegisterFormInput = styled.input`
  display: block;
  width: 60%;
  height: 50px;
  margin: 8px;
  border-radius: 8px;
  font-family: "Jamsil";
`;
const RegisterFormBtn = styled.button`
  width: 40%;
  height: 40px;
  margin-top: 5%;
  background-color: #ece759;
  color: #3c578d;
  font-size: 20px;
  font-family: "Jamsil";
  cursor: pointer;
  border-radius: 8px;
`;

function Register() {
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

  const [form, setForm] = useState({ 
    id: "", 
    password: "",
    paswordConfig: "",
    nickname: ""
   });
  const Register = (e) => {
    e.preventDefault();
    console.log(form);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
          <img src={coder} className="App-logo" alt="coder"/>
          <RegisterContainer>
            <RegisterTitle>Sign up</RegisterTitle>
            <LoginForm onSubmit={Register}>
              <RegisterFormInput
                type="text"
                id="id"
                name="id"
                value={form.id}
                onChange={handleChange}
                placeholder="     아이디"
              />
              <RegisterFormInput
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="     비밀번호"
              />
              <RegisterFormInput
                type="password"
                id="passwordConfig"
                name="passwordConfig"
                value={form.passwordConfig}
                onChange={handleChange}
                placeholder="     비밀번호  확인"
              />
              <RegisterFormInput
                type="text"
                id="nickname"
                name="nickname"
                value={form.nickname}
                onChange={handleChange}
                placeholder="     별명"
              />
              <RegisterFormBtn>회원가입</RegisterFormBtn>
            </LoginForm>
          </RegisterContainer>
        </BottomContainer>
    </header>
    </div>
  );
}

export default Register;