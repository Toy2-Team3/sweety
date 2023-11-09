import React from 'react';
import styled from 'styled-components';
import CommunityItemButtons from '../Community-item-buttons/CommunityItemButtons';
import Close from '../../../assets/close.png';
import { IButtonType } from '../community-item/CommunityItem';
import Chat from '../../../assets/comments-solid.svg';

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
  min-width: 30%;
  max-width: 50%;
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

  ${(props) => props.theme.response.mobile} {
    width: 3.3rem;
    height: 3.3rem;
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

const CommunityModal = () => {
  const buttonText: IButtonType = {
    left: '삭제',
    right: '수정',
  };

  return (
    <ModalBackground>
      <ModalWrapper>
        <CloseButton>
          <img src={Close} />
        </CloseButton>
        <ModalTop>
          <ImageWrapper>
            <img
              src="https://www.handmk.com/news/photo/202306/16714_40371_5250.jpg"
              alt="user profile"
            />
          </ImageWrapper>
          <div>
            <h3>이상한 고양이</h3>
            <span>서울</span>
          </div>
        </ModalTop>
        <h1>매주 월요일 바이크 타실 분 🚴</h1>
        <p>
          안녕하세요, 바이크 소모임 000입니다! 저희 소모임은 매주 월요일 저녁
          8시에 진행됩니다. 많관부~ 어째저째 길다~~~ 내용이 길게 보입니다.
        </p>
        <ButtonWrapper>
          <GoToChatButton>
            <img src={Chat} />
            그룹 채팅 참여
          </GoToChatButton>

          {/* 삭제, 수정 버튼은 글 작성자에게만 보이게할 예정 */}
          <CommunityItemButtons buttonText={buttonText} />
        </ButtonWrapper>
      </ModalWrapper>
    </ModalBackground>
  );
};

export default CommunityModal;
