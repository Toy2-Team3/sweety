import styled from "styled-components";
import { Message } from "./ChattingSection";

const ChatBox = (item: Message) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: item.userId === "seokmin" ? "flex-end" : "flex-start",
      }}
    >
      <ChatBoxWrapper $isMyChat={item.userId === "seokmin"}>
        {/* {!item.isMine && <img src={item.profileImage} alt="" />} */}
        <div>{item.text}</div>
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
    background-color: ${(props) => (props.$isMyChat ? "#F9744C" : "#d9d9d9")};
    color: ${(props) => (props.$isMyChat ? "#fff" : "#000")};
  }
`;

export default ChatBox;
