import { ReactComponent as SweetLogo } from "../../assets/sweetyLogo.svg";
import { getUserData, updateTokenInUserCollection } from "../../utils/firebase";
import { LoginButtonProps } from "../../constants/constant";
import { ShowPasswordButton, WarnText } from "./SignUpIDPW";
import { idState, loginState, pwState } from "../../recoil/atoms";
import { useNavigate } from "react-router-dom";
import { Container } from "./StartPage";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Spinner from "../common/Spinner";

function Login() {
  const [wrong, setWrong] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [id, setId] = useRecoilState(idState);
  const [pw, setPw] = useRecoilState(pwState);
  const [noneUser, setNoneUser] = useState(false);
  const setLogin = useSetRecoilState(loginState);
  const [progress, setProgress] = useState(false);

  const navigate = useNavigate();

  interface LoginRequestBody {
    id: string;
    password: string;
  }

  interface LoginResponse {
    accessToken: string;
    refreshToken: string;
  }

  const signIn = async (id: string, password: string): Promise<void> => {
    setProgress(true);
    try {
      const requestBody: LoginRequestBody = { id, password };

      const response = await axios.post<LoginResponse>(
        "https://fastcampus-chat.net/login",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            serverId: process.env.REACT_APP_SERVER_ID,
          },
        },
      );

      if (response.status === 200) {
        const userData = await getUserData(id);

        if (userData && userData.status === "A") {
          setWrong(true);
          const data = response.data.accessToken;
          sessionStorage.setItem("accessToken", data);
          sessionStorage.setItem("isLogin", "true");
          sessionStorage.setItem("id", id);
          setLogin(true);
          updateTokenInUserCollection(id, data);
          navigate("/");
        } else {
          setNoneUser(true);
          setWrong(false);
          setProgress(false);
        }
      } else {
        console.error("로그인에 실패했습니다 :", response.status);
        setWrong(true);
        setNoneUser(false);
        setProgress(false);
      }
    } catch (error) {
      console.error("서버에 로그인 요청을 보내지 못했습니다 :", error);
      setWrong(true);
      setNoneUser(false);
      setProgress(false);
    }
  };

  return (
    <Container>
      <SweetLogo onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
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
      <InputWrapper>
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
      <InputWrapper>
        {/* Conditionally render the button or spinner */}
        {progress ? (
          <Spinner />
        ) : (
          <LoginButton
            id={id}
            pw={pw}
            onClick={async () => {
              await signIn(id, pw);
            }}
            disabled={!id || !pw || progress} // Disable the button when progress is true
          >
            로그인
          </LoginButton>
        )}
        {id && pw && noneUser && wrong === false ? (
          <WarnText>탈퇴한 회원입니다</WarnText>
        ) : id && pw && wrong ? (
          <WarnText>아이디 및 비밀번호를 다시 확인해주세요</WarnText>
        ) : null}
      </InputWrapper>
      <RegisterLink onClick={() => navigate("/signup1")}>
        회원가입하러 가기
      </RegisterLink>
    </Container>
  );
}

export const InputWrapper = styled.div<{ margin?: string }>`
  margin: ${(props) => props.margin || "10px 0 15px"};
  position: relative;
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

export const LoginButton = styled.button<LoginButtonProps>`
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

const RegisterLink = styled.div`
  cursor: pointer;
  margin-top: 40px;
`;

export default Login;
