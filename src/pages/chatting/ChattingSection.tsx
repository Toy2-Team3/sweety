import styled from "styled-components";
import ChatBox from "./ChatBox";
import defaultImage from "../../assets/ex.jpg";
import ChattingTextarea from "./ChattingTextarea";
import hamburgerButton from "../../assets/hamburger.svg";
import exitButton from "../../assets/exitChattingRoom.svg";
import ChattingRoomList, { ChattingRoomProps } from "./ChattingRoomList";
import { useState, useEffect } from "react";

export interface ChatProps {
  isMine: boolean;
  profileImage?: "*.jpg";
  message: string;
}

const ChattingSection = ({
  roomData,
  currentRoomNumber,
  setCurrentRoomNumber,
}: {
  roomData: ChattingRoomProps[];
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowRoomList(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MainContainer>
      <div className="chatting-room-controller">
        {showRoomList && (
          <ChattingRoomList
            roomData={roomData}
            currentRoomNumber={currentRoomNumber}
            setCurrentRoomNumber={setCurrentRoomNumber}
            setShowRoomList={setShowRoomList}
          />
        )}
      </div>
      <Header>
        <img
          onClick={() => {
            setShowRoomList(true);
          }}
          src={hamburgerButton}
          alt=""
        />
        <h1>{roomData[currentRoomNumber].name}</h1>
        <img src={exitButton} alt="" />
      </Header>
      <div onClick={() => setShowRoomList(false)}>
        <ChattingViewArea>
          {chatDummy.map((item, index) => {
            return <ChatBox key={index} {...item} />;
          })}
        </ChattingViewArea>
        <ChattingTextarea />
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.section`
  width: 100%;
  min-width: 376px;
  position: relative;

  @media screen and (max-width: 1024px) {
    height: 100vh;
  }

  @media screen and (max-width: 480px) {
    height: auto;
  }
`;

const ChattingViewArea = styled.main`
  height: calc(100vh - 83px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: scroll;
  padding: 73px 30px 10px;

  @media screen and (max-width: 1024px) {
    padding: 73px 20px 10px;
  }

  @media screen and (max-width: 480px) {
    height: calc(100vh - 183px);
  }
`;

const Header = styled.header`
  position: fixed;
  display: flex;
  width: calc(100% - 564px);
  height: 63px;
  padding: 0 16px;
  background-color: white;
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  align-items: center;

  > img:first-child {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    width: calc(100% - 104px);
    left: 104px;

    > img:first-child {
      display: block;
    }
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    left: 0;
  }

  img {
    cursor: pointer;
    flex-shrink: 0;
  }

  h1 {
    font-size: 20px;
    font-weight: 600;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    line-height: 24px;

    @media screen and (max-width: 480px) {
      font-size: 18px;
    }
  }
`;

export default ChattingSection;
