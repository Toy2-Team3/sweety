import React, { FC } from "react";
import styled from "styled-components";
import CommunityItemButtons, { ButtonText, ButtonType } from "./CommunityItemButtons";
import Close from "../../assets/close.png";
import Chat from "../../assets/comments-solid.svg";
import { CommonData } from "../../pages/CommunityListPage";

interface CommunityModalProps {
  item: CommonData;
  handleClosePostModal: () => void;
}

const CommunityModal: FC<CommunityModalProps> = ({
  item,
  handleClosePostModal,
}) => {
  
  const buttonText: ButtonText = {
    left: "삭제",
    right: "수정",
  };

  const buttonType: ButtonType = {
    leftBtnType:'reset',
    rightBtnType:'submit'
  };


  return (
    <ModalBackground onClick={handleClosePostModal}>
      <ModalWrapper>
        <CloseButton onClick={handleClosePostModal}>
          <img src={Close} />
        </CloseButton>
        <ModalTop>
          <ImageWrapper>
            <img src={item.profileUrl} alt="user image" />
          </ImageWrapper>
          <div>
            <h3>{item.nickName}</h3>
            <span>{item.region}</span>
          </div>
        </ModalTop>
        <h1>{item.title}</h1>
        <p>{item.content}</p>
        <ButtonWrapper>
          <GoToChatButton>
            <img src={Chat} />
            그룹 채팅 참여
          </GoToChatButton>

          {/* 삭제, 수정 버튼은 글 작성자에게만 보이게할 예정 */}
          <CommunityItemButtons buttonText={buttonText} buttonType={buttonType} />
        </ButtonWrapper>
      </ModalWrapper>
    </ModalBackground>
  );
};

export default CommunityModal;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
`;

const ModalWrapper = styled.div`
  width: 60%;
  max-height: 50%;
  padding: 3rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: left;
  gap: 1.5rem;
  background-color: white;
  border: transparent;
  border-radius: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${(props) => props.theme.response.tablet} {
    min-width: 80%;
    max-height: 80%;
    padding: 2rem;
  }
  h1 {
    font-size: 2rem;
    font-weight: bold;
    ${(props) => props.theme.response.tablet} {
      font-size: 1.7rem;
    }
    ${(props) => props.theme.response.mobile} {
      font-size: 1.3rem;
    }
  }
  p {
    font-size: 1.1rem;
    font-weight: normal;
    line-height: 1.5rem;
    ${(props) => props.theme.response.mobile} {
      font-size: 1rem;
    }
  }
`;

const CloseButton = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;

  img {
    width: 1.5rem;
    height: 1.5rem;

    ${(props) => props.theme.response.tablet} {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

const ModalTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 1rem;
  h3 {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.3rem;
    ${(props) => props.theme.response.mobile} {
      font-size: 1.3rem;
    }
  }
  span {
    color: #949494;
    font-size: 1rem;
  }
`;

const ImageWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${(props) => props.theme.response.tablet} {
    flex-direction: column;
    gap: 0.7rem;
  }
`;

const GoToChatButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  white-space: nowrap;
  color: ${(props) => props.theme.color.primary};
  font-size: 1.1rem;
  background: rgba(217, 78, 40, 0.1);
  border: transparent;
  border-radius: 0.5rem;
  padding: 0.6rem 1rem;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  img {
    width: 1.5rem;
    height: 1.5rem;
  }
  ${(props) => props.theme.response.mobile} {
    font-size: 1rem;
  }
`;
