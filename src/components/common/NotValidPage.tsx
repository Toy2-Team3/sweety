import styled from "styled-components";
import { ReactComponent as SweetLogo } from "../../assets/sweetyLogo.svg";
import { useNavigate } from "react-router-dom";

interface NotValidPageProps {
  content: string;
  navigaton: string
}

export default function NotValidPage({  content, navigaton }: NotValidPageProps ) {
  const navigate = useNavigate();

  return (
    <RootErrorMessageWrapper>
      <SweetLogo />
      <RootErrorMessage>
        {content}
      </RootErrorMessage>
      <GobackLink onClick={() => navigate("/")}>
        {navigaton}
      </GobackLink>
    </RootErrorMessageWrapper>    
  );
}

const RootErrorMessageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RootErrorMessage = styled.h1`
  font-size: 32px;
`;

const GobackLink = styled.button`
  padding: 10px;
  width: 200px;
  height: 50px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.color.primary};
  color: white;
  border: none;
  cursor: pointer;
`;