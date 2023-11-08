import styled from 'styled-components';
import { ReactComponent as SweetLogo } from '../../assets/sweetyLogo.svg';
import { Container } from './StartPage';
import { useState } from 'react';
import { ShowPasswordButton } from './SignUpIDPW';

interface ButtonProps {
  Id: string;
  Pw: string;
}
function Login() {
  const [Id, setId] = useState('');
  const [Pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);

  return (
    <Container>
      <SweetLogo />
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
      <InputWrapper style={{ position: 'relative' }}>
        <p>비밀번호</p>
        <IdPwInput
          type={showPw ? 'text' : 'password'}
          value={Pw}
          onChange={(e) => {
            setPw(e.target.value);
          }}
          placeholder="비밀변호를 입력해주세요."
        />
        <ShowPasswordButton onClick={() => setShowPw(!showPw)}>
          {showPw ? '🙂' : '😌'}
        </ShowPasswordButton>
      </InputWrapper>
      <LoginButton Id={Id} Pw={Pw}>
        로그인
      </LoginButton>
    </Container>
  );
}

export const InputWrapper = styled.div`
  margin: 10px 0 15px;
`;

export const IdPwInput = styled.input`
  width: 340px;
  height: 50px;
  padding-left: 16px;
  border: 1px solid #949494;
  border-radius: 12px;
`;

export const LoginButton = styled.button<ButtonProps>`
  width: 340px;
  height: 50px;
  background-color: ${({ Id, Pw }) => (Id && Pw ? '#d94e28' : '#dfdfdf')};
  cursor: ${({ Id, Pw }) => (Id && Pw ? 'pointer' : 'default')};
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 20px;
`;

export default Login;
