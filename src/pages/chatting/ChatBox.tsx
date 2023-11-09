import React from "react";
import styled from "styled-components";
import { ChatProps } from "./ChattingSection";

const ChatBox = (item: ChatProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: item.isMine ? "flex-end" : "flex-start",
      }}
    >
      <ChatBoxWrapper $isMyChat={item.isMine}>
        {!item.isMine && <img src={item.profileImage} alt="" />}
        <div>{item.message}</div>
      </ChatBoxWrapper>
    </div>
  );
};

const ChatBoxWrapper = styled.div<{ $isMyChat: boolean }>`
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
  }

  div {
    font-size: 16px;
    line-height: 1.3;
    font-weight: 400;
    border-radius: 30px;
    padding: 9px 20px;
    max-width: 600px;
    background-color: ${(props) => (props.$isMyChat ? "#D94E28" : "#d9d9d9")};
    color: ${(props) => (props.$isMyChat ? "#fff" : "#000")};
  }
`;

export default ChatBox;
