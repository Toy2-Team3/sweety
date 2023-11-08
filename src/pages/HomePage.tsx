import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserInfo from '../components/Home/UserInfo';
interface User {
  id: string;
  password: string;
  name: string;
  picture: string;
  chats: string[];
}
const Wrapper = styled.div`
  margin: 0 auto;
  padding: 5rem 5rem 0 5rem;
  height: 100%;
  width: 100%;
  @media (max-width: 480px) {
    padding: 1rem 1rem 0 1rem; /* Removes the padding when the screen size is 768px or less */
  }
`;

const Header = styled.div`
  > div:first-child {
    font-size: 3.5rem;
    font-weight: 700;
    color: #d94e28;
  }
  > div:nth-child(2) {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const UsersInfo = styled.div`
  width: 100%;
  margin-top: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/users.json');
        console.log('Response:', response);
        const data = await response.json();
        console.log(data);
        console.log('Data:', data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
