import { useState, ChangeEvent, useRef, useEffect } from "react";
import styled from "styled-components";
import SendChat from "../../assets/sendChatIcon.svg";

const ChattingTextarea = () => {
  const [message, setMessage] = useState<string>("");

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    adjustTextareaHeight();
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const [isSending, setIsSending] = useState<boolean>(false);
  const sendMessage = async () => {
    try {
      setIsSending(true);
      // await api 호출 응답 기다리긔
      console.log("메세지 전송: " + message);
      setIsSending(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <InputContainer>
      <textarea
        ref={textareaRef}
        maxLength={255}
        value={message}
        onChange={handleMessageChange}
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

  textarea {
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    padding: 12px 24px;
    resize: none;
    border-radius: 30px;
    border: 1px solid #c6c6c6;
    background: #fff;
    outline: none;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    max-height: 70px;

    &:focus {
      border: 1px solid #d94e28;
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
