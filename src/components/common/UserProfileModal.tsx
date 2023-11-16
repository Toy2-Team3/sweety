import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Close from "../../assets/close.png";
import { calculateAge } from "../Home/UserInfo";
import { calculateLoveSync } from "../../utils/loveSync";
import { getUserData } from "../../utils/firebase";
import { HomeUserInfo } from "../../pages/HomePage";

interface UserProfileModalProps {
  userinfo: HomeUserInfo;
  setUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  userinfo,
  setUserModal,
}) => {
  const [loveClick, setLoveClick] = useState(false);
  const [myMbti, setMyMbti] = useState("");
  const [myIntersted, setMyInterested] = useState([]);
  const [myAlcohol, setMyAlcohol] = useState("");
  const [mySmoking, setMySmoking] = useState(false);
  const [myAge, setMyAge] = useState("");

  const myId = sessionStorage.getItem("id");

  const handleModalClose = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setUserModal(false);
  };

  const handleLoveButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setLoveClick(true);
  };

  const getMyData = async () => {
    if (myId) {
      try {
        const result = await getUserData(myId);
        setMyMbti(result?.mbti);
        setMyInterested(result?.interested);
        setMySmoking(result?.smoking);
        setMyAlcohol(result?.alcohol);
        setMyAge(result?.age);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    } else {
      console.log("myId가 null입니다."); // 또는 다른 예외 처리 로직
    }
  };

  useEffect(() => {
    getMyData();
  }, []);

  return (
    <ModalBackground onClick={handleModalClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleModalClose}>
          <img src={Close} alt="Close" />
        </CloseButton>
        <ModalTop>
          <ImageWrapper>
            <img src={userinfo?.profileUrl} alt="user profile" />
          </ImageWrapper>
          <InfoWrapper>
            <div>
              <h1>
                {userinfo?.nickName} (
                {userinfo?.birth && calculateAge(userinfo.birth)})
              </h1>
              <h2>
                <span> 🧡 나와의 궁합점수는? </span>{" "}
                {loveClick ? (
                  <ScoreSpan>
                    {" "}
                    {calculateLoveSync(
                      userinfo?.mbti || "",
                      userinfo?.interested || [],
                      userinfo?.smoking || false,
                      userinfo?.alcohol || "",
                      String(calculateAge(userinfo?.birth || "")),
                      myMbti || "",
                      myIntersted || [],
                      mySmoking || false,
                      myAlcohol || "",
                      String(calculateAge(myAge || "")),
                    )}
                  </ScoreSpan>
                ) : (
                  <LoveButton onClick={handleLoveButton}>확인하기</LoveButton>
                )}
              </h2>
              <p>👤 {userinfo.gender === "female" ? "여자" : "남자"}</p>
              <p>📍 {userinfo?.region}</p>
              <p>💼 {userinfo?.job}</p>
            </div>
            <div>
              <h3>기본 정보</h3>
              <InfoBottom>
                <div>
                  <p>🧩 {userinfo?.mbti}</p>
                  <p>
                    🍺{" "}
                    {userinfo?.alcohol === "N"
                      ? "안 마셔요"
                      : userinfo?.alcohol === "S"
                      ? "가끔 마셔요"
                      : "자주 마셔요"}
                  </p>
                </div>
                <div>
                  <p>📏 {userinfo?.tall}cm</p>
                  <p>🚬 {userinfo?.smoking ? "해요" : "안 해요"}</p>
                </div>
              </InfoBottom>
            </div>
          </InfoWrapper>
        </ModalTop>
        <div>
          <>
            {userinfo?.introduction !== "" && (
              <>
                <h3>자기소개</h3>
                <div>{userinfo?.introduction}</div>
              </>
            )}

            {userinfo?.interested && userinfo.interested.length !== 0 && (
              <>
                <h3>관심사</h3>
                <div>
                  {userinfo.interested?.map((value: string) => {
                    return <Tag key={value}>{value}</Tag>;
                  })}
                </div>
              </>
            )}
          </>
        </div>
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
    max-height: 80%;
    padding: 2.5rem 2rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    ${(props) => props.theme.response.tablet} {
      font-size: 1.5rem;
    }
  }
  h2 {
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 1.4rem;
    white-space: pre-wrap;
    ${(props) => props.theme.response.tablet} {
      font-size: 1.2rem;
    }
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
    z-index: 10000;
    width: 1.5rem;
    height: 1.5rem;
    ${(props) => props.theme.response.tablet} {
      width: 1.2rem;
      height: 1.2rem;
    }
  }

  cursor: pointer;
  &:hover {
    opacity: 0.8;
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
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
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

  h2 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${(props) => props.theme.color.secondary};
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

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const LoveButton = styled.button`
  background-color: ${(props) => props.theme.color.secondary};
  border: none;
  font-size: 1.1rem;
  padding: 0.5rem 1.2rem;
  border-radius: 10px;
  color: white;
  transition: transform 0.6 s ease; // 트랜지션 효과 추가
  animation: ${pulseAnimation} 0.8s infinite; // 애니메이션 추가

  ${(props) => props.theme.response.tablet} {
    padding: 0.2rem 1rem;
    font-size: 0.8rem;
  }

  &:hover {
    transform: scale(1.03); // hover 시에 크기를 약간 키우도록 설정
    animation: none; // hover 시에는 애니메이션 중지
  }
`;
const ScoreSpan = styled.span`
  color: ${(props) => props.theme.color.secondary};
  font-weight: 800;
`;

const Tag = styled.span`
  display: inline-block;
  border-radius: 6px;
  margin: 0.3rem;
  padding: 0.3rem;
  background-color: ${(props) => props.theme.color.darkGray};
  font-size: 1rem;
  color: ${(props) => props.theme.color.black};
`;
