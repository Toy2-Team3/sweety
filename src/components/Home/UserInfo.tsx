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
    <UserImage style={{ backgroundImage: `url(${picture})` }}>
      <UserInfoWrapper />
      {userOnOff && (
        <UserActive>
          <span></span>
          <span> 현재 활동중</span>
        </UserActive>
      )}

      <UserName>
        <div>
          {name}
          <span>{first} </span>
          <span>{"(29)"}</span>
        </div>
      </UserName>
      <UserRegion>서울거주</UserRegion>
      <UserChatButton onClick={handleUserChat}>
        <WhiteChatIcon />
        {/* <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h96zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V474.7v-6.4V468v-4V416H112 64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L208 492z"/></svg> */}
      </UserChatButton>
    </UserImage>
  );
};

export default UserInfo;

const UserImage = styled.div`
  position: relative;
  height: 675px;
  width: 450px;
  margin-bottom: 6rem;
  margin: 0 0.5rem 4rem 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #808080; /* Set the default background color to gray */

  ${(props) => props.theme.response.tablet} {
    min-height: 510px;
    min-width: 340px;
    width: 60%;
  }

  ${(props) => props.theme.response.mobile} {
    height: 450px;
    width: 250px;
  }
`;

const UserInfoWrapper = styled.div`
  position: absolute;
  bottom: 0;
  background-color: black;
  opacity: 0.5;
  width: 100%;
  height: 10rem;
  @media screen and (max-width: 480px) {
    height: 5rem;
  }
  ${(props) => props.theme.response.tablet} {
    height: 7rem;
  }
`;

const UserName = styled.div`
  position: absolute;
  bottom: 6rem;
  color: rgba(255, 255, 255, 1); // Set color to white with full opacity
  font-size: 2.5rem;
  left: 1rem;
  display: flex;

  > div:first-child {
    margin-right: 3rem;
    span {
      font-size: 1.5rem;
    }
    > span:first-child {
      font-size: 1.5rem;
    }
  }

  ${(props) => props.theme.response.mobile} {
    position: absolute;
    bottom: 2rem;
    font-size: 1.5rem;
  }
  ${(props) => props.theme.response.tablet} {
    position: absolute;
    bottom: 3.5rem;
    font-size: 2rem;
  }
`;
const UserRegion = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 2rem;
  color: white;

  ${(props) => props.theme.response.tablet} {
    font-size: 1.2rem;
  }
`;
const UserChatButton = styled.button`
  position: absolute;
  bottom: 1rem;

  font-size: 2rem;
  color: white;
  right: 50%;
  display: flex;
  justify-content: center;

  ${(props) => props.theme.response.tablet} {
    font-size: 1.2rem;
  }
`;
const UserActive = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 2rem;
  color: white;
  display: flex;
  align-items: center;
  > span:first-child {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: green;
    margin-right: 0.5rem;
  }
  ${(props) => props.theme.response.mobile} {
    font-size: 1.5rem;
  }
`;
