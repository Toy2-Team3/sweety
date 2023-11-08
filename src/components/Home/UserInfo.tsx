import React from 'react';
import styled from 'styled-components';

interface UserInfoProps {
  picture: string;
  name: string;
}

const UserImage = styled.div`
  position: relative;
  height: 675px;
  min-width: 450px;

  margin: 1rem;
  margin-bottom: 6rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #808080; /* Set the default background color to gray */

  @media screen and (max-width: 480px) {
    height: 450px;
    width: 300px;
  }

  @media screen and (max-width: 1024px) {
    height: 510px;
    width: 340px;
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
`;

const UserName = styled.div`
  position: absolute;
  bottom: 5rem;
  color: rgba(255, 255, 255, 1); // Set color to white with full opacity
  font-size: 2rem;
  @media screen and (max-width: 480px) {
    position: absolute;
    bottom: 2rem;
    font-size: 1.5rem;
  }
`;

const UserInfo: React.FC<UserInfoProps> = ({ picture, name }) => {
  return (
    <UserImage style={{ backgroundImage: `url(${picture})` }}>
      <UserInfoWrapper />
      <UserName>{name}</UserName>
    </UserImage>
  );
};

export default UserInfo;
