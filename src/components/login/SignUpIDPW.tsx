import styled from 'styled-components';
import { Container } from './StartPage';
import { IdPwInput, InputWrapper } from './Login';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  Id: string;
  Pw: string;
  PwCheck: string;
}

function SignUp() {
  const [Id, setId] = useState('');
  const [Pw, setPw] = useState('');
  const [PwCheck, setPwCheck] = useState('');

  const navigate = useNavigate();

  const navigateToSignUpSpecific = () => {
    navigate('/signup2');
  };

  return (
    <Container>
      <GreetingText>환영합니다🎉</GreetingText>
      <InputWrapper>
        <p>아이디</p>
        <IdPwInput
          value={Id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="아이디를 입력해주세요."
        />
      </InputWrapper>
      <InputWrapper>
        <p>비밀번호</p>
        <IdPwInput
          value={Pw}
          onChange={(e) => {
            setPw(e.target.value);
          }}
          placeholder="비밀번호를 입력해주세요."
        />
      </InputWrapper>
      <InputWrapper>
        <p>비밀번호 확인</p>
        <IdPwInput
          value={PwCheck}
          onChange={(e) => {
            setPwCheck(e.target.value);
          }}
          placeholder="비밀번호를 입력해주세요."
        />
      </InputWrapper>
      <NextButton
        Id={Id}
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
  background-color: ${({ Id, Pw, PwCheck }) =>
    Id && Pw && PwCheck && Pw === PwCheck ? '#d94e28' : '#dfdfdf'};
  cursor: ${({ Id, Pw, PwCheck }) =>
    Id && Pw && PwCheck && Pw === PwCheck ? 'pointer' : 'default'};
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 20px;
`;
