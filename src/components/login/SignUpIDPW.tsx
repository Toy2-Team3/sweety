import styled from 'styled-components';
import { Container } from './StartPage';
import { IdPwInput, InputWrapper } from './Login';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  isInputValid: boolean;
  Pw: string;
  PwCheck: string;
}

function SignUp() {
  const [Id, setId] = useState('');
  const [Pw, setPw] = useState('');
  const [PwCheck, setPwCheck] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showPwCheck, setShowPwCheck] = useState(false);

  const isIdentificationValid = (identification: string) => {
    return (
      identification.length >= 8 &&
      /[a-z]/.test(identification) &&
      /[A-Z]/.test(identification)
    );
  };
  const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*[0-9]).{5,}$/;
    return passwordRegex.test(password);
  };
  const isIdentificationPasswordValid = (
    idendtification: string,
    password: string,
  ) => {
    return isIdentificationValid(idendtification) && isPasswordValid(password);
  };
  const isInputValid = isIdentificationPasswordValid(Id, Pw);

  const navigate = useNavigate();
  const navigateToSignUpSpecific = () => {
    if (isInputValid && Pw === PwCheck) {
      navigate('/signup2');
    }
  };

  return (
    <Container>
      <GreetingText>환영합니다🎉</GreetingText>
      <InputWrapper style={{ position: 'relative' }}>
        <p>아이디</p>
        <IdPwInput
          value={Id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="아이디를 입력해주세요"
        />
        {Id ? (
          isIdentificationValid(Id) ? (
            <CorrectText>정말 멋진 아이디네요!</CorrectText>
          ) : (
            <WarnText>*영문 소문자, 대문자 조합 8자 이상입니다.</WarnText>
          )
        ) : null}
      </InputWrapper>
      <InputWrapper style={{ position: 'relative' }}>
        <p>비밀번호</p>
        <IdPwInput
          type={showPw ? 'text' : 'password'}
          value={Pw}
          onChange={(e) => {
            setPw(e.target.value);
          }}
          placeholder="비밀번호를 입력해주세요"
        />
        {Pw ? (
          isPasswordValid(Pw) ? (
            <CorrectText>강력한 비밀번호입니다</CorrectText>
          ) : (
            <WarnText>
              *비밀번호는 특수문자, 영어, 숫자 조합 5자 이상입니다.
            </WarnText>
          )
        ) : null}
        <ShowPasswordButton onClick={() => setShowPw(!showPw)}>
          {showPw ? '🙂' : '😌'}
        </ShowPasswordButton>
      </InputWrapper>
      <InputWrapper style={{ position: 'relative' }}>
        <p>비밀번호 확인</p>
        <IdPwInput
          type={showPwCheck ? 'text' : 'password'}
          value={PwCheck}
          onChange={(e) => {
            setPwCheck(e.target.value);
          }}
          placeholder="비밀번호를 다시 입력해주세요"
        />
        {PwCheck ? (
          Pw === PwCheck ? (
            <CorrectText>정확히 입력하셨습니다</CorrectText>
          ) : (
            <WarnText>*비밀번호가 다릅니다</WarnText>
          )
        ) : null}
        <ShowPasswordButton onClick={() => setShowPwCheck(!showPwCheck)}>
          {showPwCheck ? '🙂' : '😌'}
        </ShowPasswordButton>
      </InputWrapper>
      <NextButton
        isInputValid={isInputValid}
        Pw={Pw}
        PwCheck={PwCheck}
        onClick={navigateToSignUpSpecific}
      >
        다음
      </NextButton>
    </Container>
  );
}

export default SignUp;

export const GreetingText = styled.h1`
  font-size: 64px;
`;

export const NextButton = styled.button<ButtonProps>`
  width: 340px;
  height: 50px;
  background-color: ${({ isInputValid, Pw, PwCheck }) =>
    isInputValid && Pw === PwCheck ? '#d94e28' : '#dfdfdf'};
  cursor: ${({ isInputValid, Pw, PwCheck }) =>
    isInputValid && Pw === PwCheck ? 'pointer' : 'default'};
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
  color: #d94e28;
`;

export const CorrectText = styled.div`
  position: absolute;
  bottom: -16px;
  left: 16px;
  font-size: 14px;
  color: #132f8b;
`;

export const ShowPasswordButton = styled.div`
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  right: 16px;
  bottom: 10px;
`;
