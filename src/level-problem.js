import './App.css';
import styled from "styled-components";
import React, { useState } from "react";

const ProblemContainer = styled.div`
  width: 560px;
  height: 350px;
  margin-left: 90px;
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

function Problem() {
    return (
        <ProblemContainer>
            <ProblemTitle>Problems</ProblemTitle>
            <ProblemFormBtn>level 1-1</ProblemFormBtn>
            <ProblemFormBtn>level 1-2</ProblemFormBtn>
            <ProblemFormBtn>level 1-3</ProblemFormBtn>
            <ProblemFormBtn>level 1-4</ProblemFormBtn>
            <ProblemFormBtn>level 1-5</ProblemFormBtn>
        </ProblemContainer>
    )
}