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
         <span>{name}</span> 
         <span>{"(29)"}</span>
        
      </UserName>
      <UserRegion>서울거주</UserRegion>
      <UserChatButton onClick={handleUserChat}>
        <WhiteChatIcon />
      
      </UserChatButton> 

   
    
  
    </UserCover>
  );
};

export default UserInfo;

const UserCover = styled.div`
  cursor:pointer  ;
  width: 100%;
  padding-top: 100%;
  background-color: red;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: 480px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
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


  span:first-child{
      font-size: 1.5rem;
      margin-right:0.2rem;
  }
  span:nth-child(2){
    font-size: 1.2rem;
}

  ${(props) => props.theme.response.mobile} {
    position: absolute;
    bottom: 2rem;
    font-size: 1.5rem;
  }
  ${(props) => props.theme.response.tablet} {
    position: absolute;
    bottom: 2rem;
    font-size: 1.5rem;
  }
`;
const UserRegion = styled.div`
  position: absolute;
  bottom: 0.5rem;
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
