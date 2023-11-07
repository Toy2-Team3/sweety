import { ReactComponent as SweetLogo } from '../../assets/sweetyLogo.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function StartPage() {
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate('/signup1');
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <Container>
      <SweetLogo />
      <>
        <SignUpButton onClick={navigateToSignUp}>회원가입</SignUpButton>
      </>
      <div>
        <p>계정이 있으신가요?</p>
        <SignInButton onClick={navigateToLogin}>로그인</SignInButton>
      </div>
      <>
        <IntroLink href="#">서비스 소개</IntroLink>
      </>
    </Container>
  );
}

export default StartPage;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SignUpButton = styled.button`
  width: 340px;
  height: 50px;
  margin: 40px 0;
  background-color: #d94e28;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  color: white;
`;

export const SignInButton = styled.button`
  width: 340px;
  height: 50px;
  margin: 0 0 30px 0;
  background-color: #d94e28;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  color: white;
`;

export const IntroLink = styled.a`
  color: #b3b3b3;
  font-size: 14px;
`;
