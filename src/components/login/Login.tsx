import { ReactComponent as SweetLogo } from "../../assets/sweetyLogo.svg";
import { ShowPasswordButton } from "./SignUpIDPW";
import { Container } from "./StartPage";
import styled from "styled-components";
import { useState } from "react";

interface ButtonProps {
  id: string;
  pw: string;
}
function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  return (
    <Container>
      <SweetLogo />
      <InputWrapper>
        <p>아이디</p>
        <IdPwInput
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="아이디를 입력해주세요."
        />
      </InputWrapper>
      <InputWrapper style={{ position: "relative" }}>
        <p>비밀번호</p>
        <IdPwInput
          type={showPw ? "text" : "password"}
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
          }}
          placeholder="비밀변호를 입력해주세요."
        />
        <ShowPasswordButton onClick={() => setShowPw(!showPw)}>
          {showPw ? "🙂" : "😌"}
        </ShowPasswordButton>
      </InputWrapper>
      <LoginButton id={id} pw={pw}>
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
  border: 1px solid ${(props) => props.theme.color.darkGray};
  border-radius: 12px;
  &:focus {
    border: ${(props) => props.theme.color.primary} 1px solid;
    outline: none;
  }
`;

export const LoginButton = styled.button<ButtonProps>`
  width: 340px;
  height: 50px;
  background-color: ${({ id, pw }) =>
    id && pw
      ? (props) => props.theme.color.primary
      : (props) => props.theme.color.darkGray};
  cursor: ${({ id, pw }) => (id && pw ? "pointer" : "default")};
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 20px;
`;

export default Login;
