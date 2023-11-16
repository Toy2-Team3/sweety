import { useState } from "react";
import styled from "styled-components";
import { updateUserData } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { logOut } from '../../utils/logOut';
import { useSetRecoilState } from "recoil";
import { loginState } from "../../recoil/atoms";
import ToastMessage from "../common/ToastMessage";

interface ByeModalProps {
  isOpen: boolean;
  closeModal: () => void; 
}

export default function ByeModal({ isOpen, closeModal } : ByeModalProps) {
  const title = `정말 sweety를 떠나시나요? 🥺`;
  const content = `sweety를 떠나시면 더 이상 달콤한 인연을 찾을 수 없어요..\n그래도 떠나시고 싶다면 아래 문구를 정확하게 입력해주세요.`;
  const byeMessage = `이제 그만 sweety를 떠날게요...`;
  const [inputValue, setInputValue] = useState("");
  const id = sessionStorage.getItem("id");
  const setLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();
  const [showByeToast, setShowByeToast] = useState(false);
  const [showWarningToast, setShowWarningToast] = useState(false);

  const onClickCancelButton = () => {
    closeModal();
  };

  const handleByeToastMessage = () => {
    setShowByeToast(true);

    setTimeout(() => {
      setShowByeToast(false);
    }, 2000);
  };

  const handleWarningToastMessage = () => {
    setShowWarningToast(true);

    setTimeout(() => {
      setShowWarningToast(false);
    }, 2000);
  };

  const onClickDeleteButton = async () => {
    if (inputValue === byeMessage) {
      if(id) {
        try {
          await updateUserData(id, { status: 'D' });
          handleByeToastMessage();
          console.log(`${id} 탈퇴 처리`);
        } catch (error) {
          console.log(error);
        }
      }
      setTimeout(() => {
        closeModal();
        logOut(setLogin, navigate);
      }, 2000);
    } else {
      handleWarningToastMessage();
    }
  };

  return (
    <ModalWrap $isOpen={isOpen}>
      <Modal>
        <TitleWrap>
          <Title>{title}</Title>
        </TitleWrap>
        <ContentWrap>
          <Content>{content}</Content>
        </ContentWrap>
        <InputWrap>
          <Input 
            placeholder={byeMessage}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </InputWrap>
        <ButtonWrap>
          <CancelButton onClick={onClickCancelButton}>취소</CancelButton>
          <DeleteButton onClick={onClickDeleteButton}>삭제</DeleteButton>
        </ButtonWrap>
      </Modal>
      {
        showByeToast &&
          <ToastMessage 
            content="다음에 또 만나요. 👋"
          />
      }
      {
        showWarningToast &&
          <ToastMessage 
            content="문구가 다르면 탈퇴할 수 없어요. 😔"
          />
      }
    </ModalWrap>
  )
}

const ModalWrap = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.40);
  z-index: 9999;
`;

const Modal = styled.div`
  width: 28rem;
  height: 20rem;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.color.lightGray};
  background: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const TitleWrap = styled.div`
  margin-top: 36px;
`;

const Title = styled.span`
  color: ${(props) => props.theme.color.primary};
  font-size: ${(props) => props.theme.font.largeSize};
  font-style: normal;
  font-weight: 800;
  line-height: 140%; 
`;

const ContentWrap = styled.div`
  margin-top: 20px;
`;

const Content = styled.span`
  color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.font.middleSize};
  font-weight: 500;
  line-height: 140%; 
  white-space: pre-wrap;
`;

const InputWrap = styled.div`
  margin-top: 28px;
`;

const Input = styled.input`
  width: 300px;
  height: 36px;
  padding: 10px;
  outline: none;
`;

const ButtonWrap = styled.div`
  margin: 32px 0 28px 0;
  color: ${(props) => props.theme.color.borderGray};
  font-size: ${(props) => props.theme.font.middleSize};
  font-weight: 500;
  line-height: 140%; 
  display: flex;
  gap: 8px;
`;

const CancelButton = styled.button`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  border-radius: 21px;
  border: 1px solid ${(props) => props.theme.color.darkGray};
  background: #FFF;
  color: ${(props) => props.theme.color.borderGray};

  &:hover {
    cursor: pointer;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  border: none;
  border-radius: 21px;
  background: ${(props) => props.theme.color.primary};
  color: #FFF;

  &:hover {
      cursor: pointer;
  }
`;