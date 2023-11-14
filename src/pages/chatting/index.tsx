import styled from "styled-components";
import ChattingRoomList, { ChattingRoomProps } from "./ChattingRoomList";
import ChattingSection from "./ChattingSection";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Chatting = () => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  const [myRoomData, setMyRoomData] = useState<ChattingRoomProps[]>();

  useEffect(() => {
    try {
      const fetchMyChattingRooms = async () => {
        const res = await axios.get("https://fastcampus-chat.net/chat", {
          headers: {
            "Content-Type": "application/json",
            serverId: `${process.env.REACT_APP_SERVER_ID}`,
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        });
        setMyRoomData(res.data.chats);
      };

      fetchMyChattingRooms();
    } catch (e) {
      console.log("error: ", e);
    }
  }, [chatId]);

  return (
    <PageContainer>
      <div className="roomlist-controller">
        <ChattingRoomList myRoomData={myRoomData} />
      </div>
      <ChattingSection myRoomData={myRoomData} />
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
