import { NextButtonProps } from "../../constants/constant";
import { useCallback, useEffect, useState } from "react";
import { activeStepState, idState, pwState } from "../../recoil/atoms";
import { IdPwInput, InputWrapper } from "./Login";
import { useNavigate } from "react-router-dom";
import SignUpStepper from "./SignUpStepper";
import { Container } from "./StartPage";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import axios from "axios";
import {
  debounce,
  isIdentificationPasswordValid,
  isIdentificationValid,
  isPasswordValid,
} from "../../utils/registerFunction";

function SignUpIDPW() {
  const [id, setId] = useRecoilState(idState);
  const [pw, setPw] = useRecoilState(pwState);
  const [pwCheck, setPwCheck] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPwCheck, setShowPwCheck] = useState(false);
  const [isIdDuplicated, setIsIdDuplicated] = useState(false);
  const [activeStep, setActiveStep] = useRecoilState(activeStepState);

  const isInputValid = isIdentificationPasswordValid(id, pw);

  const checkIdDuplication = async (id: string) => {
    try {
      const response = await axios.post(
        "https://fastcampus-chat.net/check/id",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
            serverId: process.env.REACT_APP_SERVER_ID,
          },
        },
      );

      if (response.status === 200) {
        const data = response.data;
        setIsIdDuplicated(data.isDuplicated);
        console.log("중복검사함");
        console.log("중복", data.isDuplicated);
        console.log(isIdentificationValid(id));
      }
    } catch (error) {
      console.log(isIdentificationValid(id));
      console.log("다음과 같은 이유로 중복검사를 할 수 없습니다 :", error);
    }
  };

  const debouncedCheckIdDuplication = useCallback(
    debounce(checkIdDuplication, 1500),
    [checkIdDuplication],
  );

  useEffect(() => {
    setActiveStep(0);
    console.log(activeStep);
    if (id) {
      debouncedCheckIdDuplication.call({}, id);
    }
  }, [id, debouncedCheckIdDuplication]);

  const navigate = useNavigate();
  const navigateToNextPage = () => {
    if (isIdDuplicated === false) {
      navigate("/signup2");
    }
  };

  return (
    <Container>
      <GreetingText>환영합니다🎉</GreetingText>
      <InputWrapper style={{ position: "relative" }}>
        <p>아이디</p>
        <IdPwInput
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="아이디를 입력해주세요"
        />
        {id ? (
          isIdentificationValid(id) === true && isIdDuplicated === true ? (
            <WarnText>이미 사용중인 아이디 입니다😢</WarnText>
          ) : isIdentificationValid(id) === false ? (
            <WarnText>숫자, 영문 소문자, 대문자 조합 8자 이상입니다.</WarnText>
          ) : (
            <CorrectText>정말 멋진 아이디네요!</CorrectText>
          )
        ) : null}
      </InputWrapper>
      <InputWrapper style={{ position: "relative" }}>
        <p>비밀번호</p>
        <IdPwInput
          type={showPw ? "text" : "password"}
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
          }}
          placeholder="비밀번호를 입력해주세요"
        />
        {pw ? (
          isPasswordValid(pw) ? (
            <CorrectText>강력한 비밀번호입니다</CorrectText>
          ) : (
            <WarnText>
              비밀번호는 특수문자, 영어, 숫자 조합 5자 이상입니다.
            </WarnText>
          )
        ) : null}
        <ShowPasswordButton onClick={() => setShowPw(!showPw)}>
          {showPw ? "🙂" : "😌"}
        </ShowPasswordButton>
      </InputWrapper>
      <InputWrapper style={{ position: "relative" }}>
        <p>비밀번호 확인</p>
        <IdPwInput
          type={showPwCheck ? "text" : "password"}
          value={pwCheck}
          onChange={(e) => {
            setPwCheck(e.target.value);
          }}
          placeholder="비밀번호를 다시 입력해주세요"
        />
        {pwCheck ? (
          pw === pwCheck ? (
            <CorrectText>정확히 입력하셨습니다</CorrectText>
          ) : (
            <WarnText>비밀번호가 다릅니다</WarnText>
          )
        ) : null}
        <ShowPasswordButton onClick={() => setShowPwCheck(!showPwCheck)}>
          {showPwCheck ? "🙂" : "😌"}
        </ShowPasswordButton>
      </InputWrapper>
      <NextButton
        pw={pw}
        pwCheck={pwCheck}
        isIdentificationValid={isIdentificationValid(id)}
        isInputValid={isInputValid}
        isIdDuplicated={isIdDuplicated}
        onClick={navigateToNextPage}
      >
        두근거리는 만남이 기다려요!
      </NextButton>
      <SignUpStepper />
    </Container>
  );
}

export default SignUpIDPW;

export const GreetingText = styled.h1`
  font-size: 64px;
`;

export const NextButton = styled.button<NextButtonProps>`
  width: 340px;
  height: 50px;
  background-color: ${({
    isIdentificationValid,
    isInputValid,
    pw,
    pwCheck,
    isIdDuplicated,
  }) =>
    isIdentificationValid && isInputValid && pw === pwCheck && !isIdDuplicated
      ? (props) => props.theme.color.primary
      : (props) => props.theme.color.darkGray};
  cursor: ${({
    isIdentificationValid,
    isInputValid,
    pw,
    pwCheck,
    isIdDuplicated,
  }) =>
    isIdentificationValid && isInputValid && pw === pwCheck && !isIdDuplicated
      ? "pointer"
      : "default"};
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 20px;
`;

export const WarnText = styled.div`
  position: absolute;
  bottom: -16px;
  left: 16px;
  font-size: 14px;
  color: ${(props) => props.theme.color.primary};
`;

export const CorrectText = styled.div`
  position: absolute;
  bottom: -16px;
  left: 16px;
  font-size: 14px;
  color: ${(props) => props.theme.color.successMessage};
`;

export const ShowPasswordButton = styled.div`
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  right: 16px;
  bottom: 10px;
`;
