import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as WhiteChatIcon } from "../../assets/chattingIcon.svg";
import UserProfileModal from "../common/UserProfileModal";

export interface UserInfoProps {
  id: string;
  userId?: string;
  password?: string;
  token?: string;
  nickName?: string;
  birth?: string;
  gender?: string;
  region?: string;
  profileUrl?: string;
  myChats?: string[];
  introduction?: string;
  interested?: string[];
  status?: string;
  alcohol?: string;
  smoking?: boolean;
  mbti?: string;
  job?: string;
  tall?: number;
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

  const [userOnOff, setUserOnOff] = useState(true);

  const handleUserChat = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    console.log("userChat");
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
      {userOnOff && (
        <UserActive>
          <span></span>
          <span> 현재 활동중</span>
        </UserActive>
      )}

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
  overflow: hidden;
  cursor: pointer;
`;
const BackgroundBlur = styled.div`
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
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const UserName = styled.div`
  z-index: 2;
  position: absolute;
  bottom: 2rem;
  color: rgba(255, 255, 255, 1); // Set color to white with full opacity
  font-size: 1.5rem;
  left: 0.5rem;
  display: flex;

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

  ${(props) => props.theme.response.tablet} {
    font-size: 1.2rem;
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
