import styled from "styled-components";
import ChattingRoomList from "./ChattingRoomList";
import ChattingSection from "./ChattingSection";
import { useState } from "react";

const Chatting = () => {
  const [currentRoomNumber, setCurrentRoomNumber] = useState<number>(0);

  return (
    <PageContainer>
      {/* 사이드 nav 바임 삭제해야돼 */}
      <div
        style={{
          width: "104px",
          backgroundColor: "gray",
          flexShrink: "0",
          height: "100vh",
        }}
      ></div>
      <div className="roomlist-controller">
        <ChattingRoomList
          currentRoomNumber={currentRoomNumber}
          setCurrentRoomNumber={setCurrentRoomNumber}
        />
      </div>
      <ChattingSection
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
