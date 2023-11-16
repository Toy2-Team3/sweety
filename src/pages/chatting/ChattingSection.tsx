import styled from "styled-components";
import ChatBox from "./ChatBox";
import ChattingTextarea from "./ChattingTextarea";
import hamburgerButton from "../../assets/hamburger.svg";
import exitButton from "../../assets/exitChattingRoom.svg";
import chatRoomUserList from "../../assets/chatRoomUserList.svg";
import ChattingRoomList from "./ChattingRoomList";
import { ChattingRoomProps, Message } from "../../types/chatting";
import { useState, useEffect, useRef } from "react";
import { getChattingRoomSocket } from "../../socket";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import UserListModal from "./UserListModal";
import ToastMessage from "../../components/common/ToastMessage";

const ChattingSection = ({
  myRoomData,
}: {
  myRoomData: ChattingRoomProps[] | undefined;
}) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const [showRoomList, setShowRoomList] = useState<boolean>(false);
  const [showUserListModal, setShowUserListModal] = useState<boolean>(false);
  const chatId = searchParams.get("chatId");
  const currentRoom = myRoomData?.find((room) => room.id === chatId);
  const currentRoomName = currentRoom ? currentRoom.name : "";
  const [chatSocket, setChatSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUser] = useState<string[] | undefined>([]);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [newMessages, setNewMessages] = useState<Message>();
  const [newEntrance, setNewEntrance] = useState<{
    id: string;
    type: "leave" | "join";
  }>();
  const [toastMessage, setToastMessage] = useState<{
    show: boolean;
    content: string;
  }>({ show: false, content: "" });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowRoomList(false);
      }
    };
    window.addEventListener("resize", handleResize);

    if (scrollRef.current && scrollRef.current.scrollTop > 0) {
      scrollRef.current.scrollTop = scrollRef.current.scrollTop + 60;
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      chatSocket?.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  const getSocket = () => {
    setChatSocket(getChattingRoomSocket(chatId));
  };

  const subscribeChatRoom = () => {
    if (chatSocket) {
      chatSocket.emit("users");
      chatSocket.emit("fetch-messages");

      chatSocket.on("users-to-client", (data: any) => {
        setOnlineUser(data.users);
      });

      chatSocket.on("messages-to-client", (data: any) => {
        setChatMessages(data.messages);
      });

      chatSocket.on("message-to-client", (data: Message) => {
        setNewMessages(data);
      });

      chatSocket.on("join", (data: any) => {
        setNewEntrance({ id: data.joiners[0], type: "join" });
      });

      chatSocket.on("leave", (data: any) => {
        setNewEntrance({ id: data.leaver, type: "leave" });
      });
    }
  };

  useEffect(() => {
    // 채팅방을 변경할때마다 해당 채팅방으로 연결하는 소켓을 받아옴
    setChatMessages([]);
    getSocket();
    // eslint-disable-next-line
  }, [chatId]);

  useEffect(() => {
    // 소켓이 변경되면 해당 소켓으로 이벤트들을 구독
    subscribeChatRoom();
    // eslint-disable-next-line
  }, [chatSocket]);

  useEffect(() => {
    if (newMessages) setChatMessages((prev) => [...prev, newMessages]);
  }, [newMessages]);

  const fetchNewUserInfoAndAlert = async () => {
    if (newEntrance?.id === undefined || null) return;
    else if (newEntrance.id === sessionStorage.getItem("id")) return;
    const alertMessage =
      newEntrance.type === "join" ? "입장하였습니다." : "퇴장하였습니다.";
    const res = await axios.get(
      `https://fastcampus-chat.net/user?userId=${newEntrance.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          serverId: `${process.env.REACT_APP_SERVER_ID}`,
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      },
    );
    setToastMessage({
      show: true,
      content: `${res.data.user.name}님이 ${alertMessage}`,
    });
    setTimeout(() => {
      setToastMessage({ show: false, content: "" });
    }, 2000);

    setNewEntrance(undefined);
  };

  useEffect(() => {
    fetchNewUserInfoAndAlert();
  }, [newEntrance]);

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
        chatSocket.disconnect();
        setTimeout(() => navigate(`/chat`), 500);
      }
    } else {
      console.log("취소");
    }
  };

  return (
    <MainContainer>
      {toastMessage.show && <ToastMessage content={toastMessage?.content} />}
      <div className="chatting-room-controller">
        {showRoomList && (
          <ChattingRoomList
            myRoomData={myRoomData}
            setShowRoomList={setShowRoomList}
          />
        )}
      </div>
      <Header $chatId={chatId}>
        <img
          onClick={() => {
            setShowRoomList(true);
          }}
          src={hamburgerButton}
          alt=""
        />
        <h1>{currentRoomName}</h1>
        <div>
          <img
            onClick={() => {
              setShowUserListModal((prev) => !prev);
              setShowRoomList(false);
            }}
            src={chatRoomUserList}
            alt=""
          />
          <img onClick={onExit} src={exitButton} alt="" />
        </div>
      </Header>
      <div onClick={() => setShowRoomList(false)}>
        {chatId ? (
          <>
            <ChattingViewArea ref={scrollRef}>
              {chatMessages.map((item, index) => {
                return <ChatBox key={index} {...item} />;
              })}
            </ChattingViewArea>
            <ChattingTextarea sendMessageAPI={sendMessageAPI} />
          </>
        ) : (
          <ChattingViewArea>
            <NotEnterRoom>채팅방에 입장해 주세요</NotEnterRoom>
          </ChattingViewArea>
        )}
      </div>
      {showUserListModal && (
        <UserListModal
          setShowUserListModal={setShowUserListModal}
          allUsers={currentRoom?.users}
          onlineUsers={onlineUsers}
        />
      )}
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
    padding: 73px 20px 20px;
  }

  @media screen and (max-width: 480px) {
    padding-bottom: 90px;
    height: calc(100vh - 186px);
  }
`;

const Header = styled.header<{ $chatId: string | null }>`
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
    width: calc(100% - 99px);
    left: 99px;

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
    display: ${(props) => (props.$chatId ? "" : "none")};
  }

  h1 {
    font-size: 20px;
    font-weight: 600;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    line-height: 24px;
    padding: 0 10px;

    @media screen and (max-width: 480px) {
      font-size: 18px;
    }
  }

  div {
    display: flex;
    gap: 20px;
  }
`;

const NotEnterRoom = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 480px) {
    top: 60%;
  }
`;

export default ChattingSection;
