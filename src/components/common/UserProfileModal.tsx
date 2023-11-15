import React from "react";
import styled from "styled-components";
import Close from "../../assets/close.png";

const UserProfileModal = () => {
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
          <InfoWrapper>
            <div>
              <h1>이상한 고양이 (27)</h1>
              {/* 렌더링할 떄 올해 - 탄생년도 계산하기 */}
              <p>👤 여자</p>
              <p>📍 서울</p>
              <p>💼 회사원</p>
            </div>
            <div>
              <h3>기본 정보</h3>
              <InfoBottom>
                <div>
                  <p>🧩 INFP</p>
                  <p>🍺 가끔 마셔요</p>
                </div>
                <div>
                  <p>📏 166cm</p>
                  <p>🚬 안 해요</p>
                </div>
              </InfoBottom>
            </div>
          </InfoWrapper>
        </ModalTop>
        <ModalBottom>
          <h3>자기소개</h3>
          <div>
            자기소개입니다. 이름은 제니이고 INFP입니다. 술 가끔 마시구요 담배는
            안해요
          </div>
          <h3>관심사</h3>
          <div>1,2,3,4,5</div>
        </ModalBottom>
      </ModalWrapper>
    </ModalBackground>
  );
};

export default UserProfileModal;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
`;

export const ModalWrapper = styled.div`
  width: 60%;
  padding: 3rem;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: left;

  background-color: white;
  border: transparent;
  border-radius: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${(props) => props.theme.response.tablet} {
    width: 90%;
    max-height: 70%;
    padding: 2.5rem 2rem;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7rem;
    white-space: pre-wrap;
  }
`;

export const CloseButton = styled.div`
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
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;

  ${(props) => props.theme.response.mobile} {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

export const ImageWrapper = styled.div`
  width: 40%;
  aspect-ratio: 1 / 1;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;

  ${(props) => props.theme.response.mobile} {
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const InfoWrapper = styled.div`
  width: 60%;
  height: 100%;

  display: flex;
  flex-direction: column;

  ${(props) => props.theme.response.mobile} {
    width: 100%;
    height: 100%;
  }
`;

const ModalBottom = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const InfoBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  div {
    width: 50%;
  }
`;
