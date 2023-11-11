import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as WhiteChatIcon } from "../../assets/chattingWhiteIcon.svg";

interface UserInfoProps {
  picture: string;
  name: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ picture, name }) => {
  const [first, setfirst] = useState("♂");
  const [userOnOff, setUserOnOff] = useState(false);
  const handleUserChat = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    console.log("userChat");
  };
  useEffect(() => {
    setfirst("♀");
    setUserOnOff(true);
  }, []);
  return (
    <UserCover>
    <UserImage src={picture}/>
    {userOnOff && (
        <UserActive>
          <span></span>
          <span> 현재 활동중</span>
        </UserActive>
      )}

      <UserName>
        <div>
          <span> {name}</span>
          <span>{"(29)"}</span>
        </div>
      </UserName>
      <UserRegion>서울거주</UserRegion>
      <UserChatButton onClick={handleUserChat}>
        <WhiteChatIcon />
        {/* <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h96zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V474.7v-6.4V468v-4V416H112 64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L208 492z"/></svg> */}
      </UserChatButton>
    </UserCover>
  );
};

export default UserInfo;

const UserCover = styled.div`
  width: 100%;
  padding-top: 100%;
  background-color: red;
  position: relative;
  overflow: hidden;
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
  position: absolute;
  bottom: 2rem;
  color: rgba(255, 255, 255, 1); // Set color to white with full opacity
  font-size: 1.5rem;
  left: 0.5rem;
  display: flex;

  span:nth-child(2) {
    font-size: 1.2rem;
  }
  span:nth-child(2){
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
