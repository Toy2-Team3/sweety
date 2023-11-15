import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as WhiteChatIcon } from "../../assets/chattingWhiteIcons.svg";
import UserProfileModal from "../common/UserProfileModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface UserInfoProps {
  id: string;
  userId: string;
  password: string;
  token: string;
  nickName: string;
  birth: string;
  gender: string;
  region: string;
  profileUrl: string;
  myChats: string[];
  introduction: string;
  interested: string[];
  status: string;
  alcohol: string;
  smoking: boolean;
  mbti: string;
  job: string;
  tall: number;
}
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

const UserInfo = ({ userinfo }: { userinfo: UserInfoProps }) => {
  const [userModal, setUserModal] = useState(false);
  const mySession = sessionStorage.getItem("accessToken");
  const myId = sessionStorage.getItem("id");
  const [userOnOff, setUserOnOff] = useState(true);
  const navigate = useNavigate();

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
      console.log(response);
      if (response.status === 200) {
        navigate(`/chat?chatId=${response.data.id}`);
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
          console.log(filteredChats[0].id);
          navigate(`/chat?chatId=${filteredChats[0].id}`);
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

  return (
    <UserCover>
      <UserImage src={userinfo?.profileUrl} onClick={handleDetailModal} />
      {/* {userOnOff && (
        <UserActive>
          <span></span>
          <span> 현재 활동중</span>
        </UserActive>
      )} */}

      <UserName>
        <div>
          <span> {userinfo?.nickName}</span>
          {userinfo?.birth && <span>({calculateAge(userinfo.birth)})</span>}
        </div>
      </UserName>
      <UserRegion>{userinfo?.region}</UserRegion>
      <UserChatButton onClick={handleUserChat}>
        <WhiteChatIcon />
      </UserChatButton>
      {userModal === true && (
        <UserProfileModal userinfo={userinfo} setUserModal={setUserModal} />
      )}
      <BackgroundBlur />
    </UserCover>
  );
};

export default UserInfo;

const UserCover = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  cursor: pointer;
`;
const BackgroundBlur = styled.div`
  border-radius: 0.5rem;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background-color: rgba(
    0,
    0,
    0,
    0.5
  ); /* Adjust the alpha value for transparency */
`;
const UserImage = styled.img`
  border-radius: 0.5rem;

  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: all 0.3s;
  box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.5);
  &:hover {
    transform: scale(1.03);
    cursor: pointer;
  }
`;

const UserName = styled.div`
  z-index: 2;
  position: absolute;
  bottom: 2rem;
  color: rgba(255, 255, 255, 1); // Set color to white with full opacity
  font-size: 1.5rem;
  left: 0.5rem;
  display: flex;
  span:nth-child(1) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  span:nth-child(2) {
    font-size: 1.2rem;
  }
  span:nth-child(2) {
    font-size: 1.2rem;
  }

  ${(props) => props.theme.response.tablet} {
    position: absolute;
    bottom: 2rem;
    font-size: 1.2rem;
    span:nth-child(2) {
      font-size: 1rem;
    }
  }
  ${(props) => props.theme.response.mobile} {
    position: absolute;
    bottom: 2rem;
    font-size: 1.2rem;
    span:nth-child(2) {
      font-size: 1rem;
    }
  }
`;

const UserRegion = styled.div`
  z-index: 2;

  position: absolute;
  bottom: 0.7rem;
  left: 0.5rem;
  font-size: 1rem;
  color: white;

  ${(props) => props.theme.response.tablet} {
    font-size: 0.8rem;
  }
`;
const UserChatButton = styled.button`
  z-index: 2;
  position: absolute;
  bottom: 1rem;
  font-size: 2rem;
  color: white;
  right: 1rem;
  display: flex;
  justify-content: center;
  background-color: transparent;
  border: none;
  ${(props) => props.theme.response.tablet} {
    font-size: 1.2rem;
  }
  transition: all 0.3s;
  &:hover {
    transform: scale(1);
    cursor: pointer;
  }
`;
const UserActive = styled.div`
  position: absolute;
  top: 1rem;
  left: 0.5rem;
  font-size: 1rem;
  color: white;
  display: flex;
  align-items: center;
  > span:first-child {
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: green;
    margin-right: 0.5rem;
  }
  ${(props) => props.theme.response.mobile} {
    font-size: 0.8rem;
  }
`;
