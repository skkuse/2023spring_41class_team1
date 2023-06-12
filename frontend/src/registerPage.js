import coder from './image/coder.svg';
import './App.css';
import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//디자인
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
const RegisterForm = styled.form`
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
const api = axios.create({
  baseURL: 'http://localhost:8000'  // 백엔드 서버의 주소와 포트를 baseURL로 설정
});
//회원가입 기능
function Register() {
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

  //회원가입 형식
  const [form, setForm] = useState({ 
    id: "", 
    password: "",
    passwordConfig: "",
    nickname: ""
   });
   
   const [condition, setCondition] = useState(0);
  
   //정보 백엔드로 보내기
   const handleRegister = async(e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/register/', {
        username: form.id,
        password: form.password,
        password_config: form.passwordConfig,
      });
      if (response.data.message === '비밀번호 불일치'){
        setCondition(0);
        alert('비밀번호가 불일치합니다.')
      }
      else{
        setCondition(1);
        alert("회원가입에 성공했습니다.");
        navigateToLogin();
      }
      
    } catch (error) {
      setCondition(0);
      alert("아이디가 중복되었습니다.");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  //onclick 실행 시 동작해야 하는 것들
  const onClickExecute = (e) => {
    handleRegister(e);
  };

  //banner: 상단 배너
  //container: 구조 디자인
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
            <RegisterForm>
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
              
              <RegisterFormBtn onClick={onClickExecute}>회원가입</RegisterFormBtn>
            </RegisterForm>
          </RegisterContainer>
        </BottomContainer>
    </header>
    </div>
  );
}

export default Register;