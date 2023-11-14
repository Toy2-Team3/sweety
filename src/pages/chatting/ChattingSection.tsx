import styled from "styled-components";
import ChatBox from "./ChatBox";
import ChattingTextarea from "./ChattingTextarea";
import hamburgerButton from "../../assets/hamburger.svg";
import exitButton from "../../assets/exitChattingRoom.svg";
import ChattingRoomList from "./ChattingRoomList";
import { ChattingRoomProps, Message } from "../../types/chatting";
import { useState, useEffect, useRef } from "react";
import { getChattingRoomSocket } from "../../socket";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const ChattingSection = ({
  myRoomData,
}: {
  myRoomData: ChattingRoomProps[] | undefined;
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  const currentRoom = myRoomData?.find((room) => room.id === chatId);
  const currentRoomName = currentRoom ? currentRoom.name : "";
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [newMessages, setNewMessages] = useState<Message>();
  const [showRoomList, setShowRoomList] = useState<boolean>(false);
  const [chatSocket, setChatSocket] = useState(getChattingRoomSocket(chatId));
  const scrollRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setChatMessages([]);
    const getSocket = () => {
      setChatSocket(getChattingRoomSocket(chatId));
    };
    getSocket();
  }, [chatId]);

  useEffect(() => {
    const getPrevMessage = () => {
      if (chatSocket) {
        chatSocket.emit("fetch-messages");
        chatSocket.on("messages-to-client", (data) => {
          setChatMessages(data.messages);
        });
        chatSocket.on("message-to-client", (data: Message) => {
          setNewMessages(data);
        });
        chatSocket.on("join", () => {
          // console.log("join", data);
        });
        chatSocket.on("leave", () => {
          // console.log("leave", data);
        });
        chatSocket.on("users-to-client", () => {
          // console.log("users-to-client", data);
        });
      }
    };
    getPrevMessage();
  }, [chatSocket]);

  useEffect(() => {
    if (newMessages) setChatMessages((prev) => [...prev, newMessages]);
  }, [newMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const sendMessageAPI = (message: string) => {
    chatSocket?.emit("message-to-server", message);
  };

  const onExit = async () => {
    if (window.confirm("정말 채팅방을 나가시겠습니까?")) {
      const res = await axios.patch(
        "https://fastcampus-chat.net/chat/leave",
        { chatId: `${chatId}` },
        {
          headers: {
            "Content-Type": "application/json",
            serverId: `${process.env.REACT_APP_SERVER_ID}`,
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        },
      );
      if (res.status === 200 && myRoomData) {
        setTimeout(() => navigate(`/chat`), 500);
      }
    } else {
      console.log("취소");
    }
  };

  return (
    <MainContainer>
      <div className="chatting-room-controller">
        {showRoomList && (
          <ChattingRoomList
            myRoomData={myRoomData}
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
        <h1>{currentRoomName}</h1>
        <img onClick={onExit} src={exitButton} alt="" />
      </Header>
      <div onClick={() => setShowRoomList(false)}>
        <ChattingViewArea ref={scrollRef}>
          {chatMessages.map((item, index) => {
            return <ChatBox key={index} {...item} />;
          })}
        </ChattingViewArea>
        <ChattingTextarea sendMessageAPI={sendMessageAPI} />
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
