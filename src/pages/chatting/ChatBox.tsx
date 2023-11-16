import styled from "styled-components";
import { Message } from "../../types/chatting";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatBox = (item: Message) => {
  const [userImage, setUserImage] = useState<string | undefined>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchUserData = async () => {
    try {
      setIsFetching(true);
      const res = await axios.get(
        `https://fastcampus-chat.net/user?userId=${item.userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            serverId: `${process.env.REACT_APP_SERVER_ID}`,
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        },
      );
      setUserImage(res.data.user.picture);
      setIsFetching(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const myId = sessionStorage.getItem("id");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: item.userId === myId ? "flex-end" : "flex-start",
      }}
    >
      <ChatBoxWrapper $isMyChat={item.userId === myId} $isFetching={isFetching}>
        {item.userId !== myId && <img src={userImage} alt="" />}
        <div>{item.text}</div>
      </ChatBoxWrapper>
    </div>
  );
};

const ChatBoxWrapper = styled.div<{ $isMyChat: boolean; $isFetching: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: ${(props) => (props.$isMyChat ? "0 0 0 30px" : "0 30px 0 0")};

  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    border: 0.3px solid #d9d9d9;
    background-color: ${(props) => (props.$isFetching ? "grey" : "none")};
  }

  div {
    font-size: 16px;
    line-height: 1.3;
    font-weight: 400;
    border-radius: 30px;
    padding: 9px 20px;
    max-width: 600px;
    background-color: ${(props) => (props.$isMyChat ? "#F9744C" : "#d9d9d9")};
    color: ${(props) => (props.$isMyChat ? "#fff" : "#000")};
  }
`;

export default ChatBox;
