import styled from "styled-components";
import ChattingRoomList, { ChattingRoomProps } from "./ChattingRoomList";
import ChattingSection from "./ChattingSection";
import { useState } from "react";

const Chatting = () => {
  const [dummyRoomData] = useState<ChattingRoomProps[]>([
    { name: "User 1과의 채팅", online: true, roomId: 1 },
    { name: "User 2과의 채팅", online: true, roomId: 2 },
    { name: "바이크 소모임 그룹 채팅", online: false, roomId: 3 },
  ]);

  const [currentRoomNumber, setCurrentRoomNumber] = useState<number>(0);

  return (
    <PageContainer>
      <div className="roomlist-controller">
        <ChattingRoomList
          roomData={dummyRoomData}
          currentRoomNumber={currentRoomNumber}
          setCurrentRoomNumber={setCurrentRoomNumber}
        />
      </div>
      <ChattingSection
        roomData={dummyRoomData}
        currentRoomNumber={currentRoomNumber}
        setCurrentRoomNumber={setCurrentRoomNumber}
      />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;

  & div.roomlist-controller {
    @media screen and (max-width: 1024px) {
      display: none;
    }
  }
`;

export default Chatting;
