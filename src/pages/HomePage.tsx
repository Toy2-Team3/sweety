import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserInfo from "../components/Home/UserInfo";
interface User {
  id: string;
  password: string;
  name: string;
  picture: string;
  chats: string[];
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/users.json");
        console.log("Response:", response);
        const data = await response.json();
        console.log(data);
        console.log("Data:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(users);
  return (
    <Wrapper>
      <Header>
        <div>Home</div>
        <div> 좋은 사람과 좋은 날을 만들어보세요.</div>
      </Header>
      <UsersInfo>
        {users.map((user, index) => (
          <UserInfo key={index} name={user.name} picture={user.picture} />
        ))}
      </UsersInfo>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  width: calc(100vw - 300px);
  padding: 5rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${(props) => props.theme.response.tablet} {
    width: calc(100vw - 100px);
    padding: 3rem;
  }

  ${(props) => props.theme.response.mobile} {
    width: 100%;
    padding: 2rem;
  }
`;
const Header = styled.div`
  > div:first-child {
    font-size: 3.5rem;
    font-weight: 700;
    color: #d94e28;
    ${(props) => props.theme.response.mobile} {
      font-size: 2rem;
    }
  }

  > div:nth-child(2) {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const UsersInfo = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  ${(props) => props.theme.response.mobile} {
    justify-content: center;
  }
  ${(props) => props.theme.response.tablet} {
    justify-content: center;
  }
`;
