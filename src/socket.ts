import { io } from "socket.io-client";

export const getChattingRoomSocket = (chatId: string | null) => {
  if (chatId === null) {
    return null;
  }
  const chatSocket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
    extraHeaders: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      serverId: `${process.env.REACT_APP_SERVER_ID}`,
    },
  });

  return chatSocket;
};

// export const getServerSocket = () => {

// }
