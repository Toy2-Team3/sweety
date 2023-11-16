import React, { useState, useEffect } from "react";
import styled from "styled-components";
import WhiteChatIcon from "../../assets/chattingWhiteIcons.svg";
import UserProfileModal from "../common/UserProfileModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HomeUserInfo } from "../../pages/HomePage";
import { onStatusChange } from "../../utils/firebase";

interface User {
  id: string;
  name: string;
  picture: string;
}
interface MakeChattingResponse {
  id: string;
  name: string;
  users: User[]; // 자신을 포함한 참가자들 정보
  isPrivate: boolean;
  updatedAt: Date;
}
interface LoginRequestBody {
  name: string;
  users: string[];
  isPrivate: boolean;
}
interface ChattingResponse {
  chats: Chat[];
}
type GetMyChattingResponse = ChattingResponse;

interface Chat {
  id: string;
  name: string;
  users: User[]; // 속한 유저 id
  isPrivate: boolean;
  latestMessage: Message | null;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
  picture: string;
}

interface Message {
  id: string;
  text: string;
  userId: string;
  createAt: Date;
}
export const calculateAge = (birthDate: string): number => {
  const currentDate = new Date();
  const birthDateObject = new Date(birthDate);

  let age = currentDate.getFullYear() - birthDateObject.getFullYear();

  if (
    currentDate.getMonth() < birthDateObject.getMonth() ||
    (currentDate.getMonth() === birthDateObject.getMonth() &&
      currentDate.getDate() < birthDateObject.getDate())
  ) {
    age--;
  }

  return age;
};

const UserInfo = ({
  userinfo,
  setShowToastMsg,
  setToastMsg,
}: {
  userinfo: HomeUserInfo;
  setShowToastMsg: (value: boolean) => void;
  setToastMsg: (content: string) => void;
}) => {
  const [userModal, setUserModal] = useState(false);
  const mySession = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState(userinfo.status);
  useEffect(() => {
    const unsubscribe = onStatusChange(userinfo.userId, (status: string) => {
      setUserStatus(status);
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, [userinfo.userId]);
  const makeChattingRoom = async (id: string, name: string): Promise<void> => {
    try {
      const requestBody: LoginRequestBody = {
        name: name,
        users: [id],
        isPrivate: true,
      };

      const response = await axios.post<MakeChattingResponse>(
        "https://fastcampus-chat.net/chat",
        requestBody,
        {
          headers: {
            "content-type": "application/json",
            serverId: process.env.REACT_APP_SERVER_ID,
            Authorization: `Bearer ${mySession}`,
          },
        },
      );
      if (response.status === 200) {
        setToastMsg("선택하신 채팅방으로 이동합니다 ✈️");
        setShowToastMsg(true);

        setTimeout(() => {
          setShowToastMsg(false);
          navigate(`/chat?chatId=${response.data.id}`);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMyChattingRooms = async (id: string) => {
    try {
      const response = await axios.get<GetMyChattingResponse>(
        "https://fastcampus-chat.net/chat",
        {
          headers: {
            "content-type": "application/json",
            serverId: process.env.REACT_APP_SERVER_ID,
            Authorization: `Bearer ${mySession}`,
          },
        },
      );

      if (response.status === 200) {
        const filteredChats = response?.data.chats.filter((chat) => {
          // 채팅이 private이고 users 배열이 존재하며,
          // users 배열 중에서 id가 desiredUserId와 일치하는 사용자가 있는지 확인
          return (
            chat.isPrivate &&
            chat.users.length === 2 &&
            chat.users.filter((u) => u.id === id).length === 1
          );
        });

        if (filteredChats?.length >= 1) {
          setToastMsg("이미 참여한 채팅입니다! 채팅방으로 이동합니다 ✈️");
          setShowToastMsg(true);

          setTimeout(() => {
            setShowToastMsg(false);
            navigate(`/chat?chatId=${filteredChats[0].id}`);
          }, 2000);
        } else {
          await makeChattingRoom(userinfo.userId, userinfo.nickName);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserChat = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    getMyChattingRooms(userinfo?.userId);
  };

  const handleDetailModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setUserModal(true);
  };

  return userStatus === "D" ? null : (
    <div>
      <UserCover>
        <UserImage src={userinfo?.profileUrl} onClick={handleDetailModal} />
        <BackgroundBlur>
          <div>
            <UserName>
              <span>{userinfo?.nickName}</span>
              {userinfo?.birth && <span>({calculateAge(userinfo.birth)})</span>}
            </UserName>
            <UserRegion>{userinfo?.region}</UserRegion>
          </div>
          <UserChatButton onClick={handleUserChat}>
            <img src={WhiteChatIcon} alt="Chat Icon" />
          </UserChatButton>
        </BackgroundBlur>
      </UserCover>
      {userModal && (
        <UserProfileModal userinfo={userinfo} setUserModal={setUserModal} />
      )}
    </div>
  );
};

export default UserInfo;

const UserCover = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;

  &:hover {
    transform: scale(1.03);
    cursor: pointer;
  }
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.5);
  transition: all 0.3s;
`;

const BackgroundBlur = styled.div`
  width: 100%;
  height: 25%;
  padding: 0 1rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  bottom: 0;
  left: 0;

  border-radius: 0 0 0.5rem 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
`;

const UserName = styled.div`
  display: flex;
  margin-bottom: 0.3rem;

  z-index: 2;

  color: rgba(255, 255, 255, 1);
  font-size: 1.3rem;

  ${(props) => props.theme.response.tablet} {
    font-size: 1.2rem;
  }

  span:nth-child(1) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const UserRegion = styled.div`
  z-index: 2;

  font-size: 1rem;
  color: white;
`;

const UserChatButton = styled.button`
  z-index: 2;

  display: flex;
  justify-content: center;
  background-color: transparent;
  border: none;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  img {
    width: 80%;
  }
`;
