import styled from "styled-components";
import ChatBox from "./ChatBox";
import defaultImage from "../../assets/ex.jpg";
import ChattingTextarea from "./ChattingTextarea";
import hamburgerButton from "../../assets/hamburger.svg";
import ChattingRoomList from "./ChattingRoomList";
import { useState } from "react";

export interface ChatProps {
  isMine: boolean;
  profileImage?: "*.jpg";
  message: string;
}

const ChattingSection = ({
  currentRoomNumber,
  setCurrentRoomNumber,
}: {
  currentRoomNumber: number;
  setCurrentRoomNumber: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const chatDummy: ChatProps[] = [
    {
      isMine: false,
      profileImage: defaultImage,
      message: "뭐하냐",
    },
    {
      isMine: true,
      message: "왜",
    },
    {
      isMine: false,
      profileImage: defaultImage,
      message: "집에 가고싶다 집에 가고싶다 집에 가고싶다 집에 가고싶다",
    },
    {
      isMine: false,
      profileImage: defaultImage,
      message: "집에 가고싶다 집에 가고싶다 집에 가고싶다 집에 가고싶다",
    },
    {
      isMine: true,
      message: "왜",
    },
    {
      isMine: false,
      profileImage: defaultImage,
      message:
        "배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다 배고프다",
    },
    {
      isMine: true,
      message: "우우루먀ㅐ러ㅐ먀넝",
    },
    {
      isMine: true,
      message: "아라라라라랄ㄹ",
    },
    {
      isMine: false,
      profileImage: defaultImage,
      message: "집에 가고싶다 집에 가고싶다 집에 가고싶다 집에 가고싶다",
    },
  ];

  const [showRoomList, setShowRoomList] = useState<boolean>(false);

  return (
    <MainContainer>
      {showRoomList && (
        <ChattingRoomList
          currentRoomNumber={currentRoomNumber}
          setCurrentRoomNumber={setCurrentRoomNumber}
          setShowRoomList={setShowRoomList}
        />
      )}
      <TabletMobileHeader>
        <img
          onClick={() => {
            setShowRoomList(true);
          }}
          src={hamburgerButton}
          alt=""
        />
      </TabletMobileHeader>
      <div onClick={() => setShowRoomList(false)}>
        <main>
          {chatDummy.map((item, index) => {
            return <ChatBox key={index} {...item} />;
          })}
        </main>
        <ChattingTextarea />
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.section`
  padding: 30px 0 0;
  width: 100%;
  min-width: 376px;
  position: relative;

  @media screen and (max-width: 1024px) {
    padding: 0px;
    height: 100vh;
  }
  main {
    height: calc(100vh - 133px);
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: scroll;
    padding: 0 30px 10px;

    @media screen and (max-width: 1024px) {
      padding: 0 20px 10px;
      display: flex;
      padding-top: 73px;
      height: calc(100vh - 83px);
    }
  }
`;

const TabletMobileHeader = styled.div`
  display: none;
  height: 63px;
  position: fixed;
  left: 104px;
  width: 100%;
  padding-left: 16px;
  background-color: white;
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1024px) {
    display: flex;
    align-items: center;
  }

  img {
    cursor: pointer;
  }
`;

export default ChattingSection;
