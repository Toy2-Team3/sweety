import { useState, ChangeEvent, useRef, useEffect } from "react";
import styled from "styled-components";
import SendChat from "../../assets/sendChatIcon.svg";

const ChattingTextarea = ({
  sendMessageAPI,
}: {
  sendMessageAPI: (message: string) => void;
}) => {
  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    adjustTextareaHeight();
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "55px";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const sendMessage = async () => {
    if (message.length === 0) return;
    const textarea = textareaRef.current;
    try {
      setMessage("");
      setIsSending(true);
      sendMessageAPI(message);
      if (textarea) textarea.style.height = "55px";
      setIsSending(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isSending) event.preventDefault();
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isSending) event.preventDefault();
    if (event.code === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <InputContainer>
      <textarea
        placeholder="메세지를 입력해주세요"
        ref={textareaRef}
        maxLength={255}
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyPress}
        onKeyUp={handleKeyUp}
      />
      <button onClick={sendMessage} disabled={isSending}>
        <img src={SendChat} alt="" />
      </button>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  width: calc(100% - 60px);
  position: absolute;
  left: 30px;
  bottom: 30px;
  gap: 14px;
  align-items: center;

  @media screen and (max-width: 1024px) {
    width: calc(100% - 40px);
    bottom: 20px;
    left: 20px;
  }

  @media screen and (max-width: 480px) {
    width: calc(100% - 40px);
    position: fixed;
    bottom: 113px;
    left: 20px;
  }

  textarea {
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    padding: 14px 24px;
    resize: none;
    border-radius: 30px;
    border: 1px solid #c6c6c6;
    background: #fff;
    outline: none;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    max-height: 70px;

    &:focus {
      border: 1px solid #d94e28;
    }
    &::placeholder {
      font-size: 16px;
    }
  }

  button {
    background: none;
    border: none;
    flex-shrink: 0;
  }

  img {
    cursor: pointer;
  }
`;

export default ChattingTextarea;
