import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserInfo from "../components/Home/UserInfo";
import { IUserData, get, getUserData } from "../utils/firebase";
import { idState, selectedGenderState } from "../recoil/atoms";
import { useRecoilState } from "recoil";
const Home = () => {
  const [gender, setGender] = useRecoilState(selectedGenderState);
  const [users, setUsers] = useState<IUserData[]>([]);
  const [userId, setUserId] = useRecoilState(idState);

  function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await get("user", "userId", userId);
        console.log(user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      if (gender === "female") {
        try {
          const userData = await get(
            "user",
            "gender" as keyof IUserData,
            "male",
          );
          console.log(userData);
          const shuffledUsers = shuffleArray(userData);
          setUsers(shuffledUsers);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        try {
          const userData = await get(
            "user",
            "gender" as keyof IUserData,
            "female",
          );
          console.log(userData);
          const shuffledUsers = shuffleArray(userData);
          setUsers(shuffledUsers);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);
  return (
    <Wrapper>
      <Header>
        <div>Home</div>
        <div> 좋은 사람과 좋은 날을 만들어보세요.</div>
      </Header>
      <UsersInfo>
        {users.map((user, index) => (
          <UserInfo key={index} userinfo={user} />
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
    display: flex;
    justify-content: center;
    align-items: center;
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
  margin-top: 4rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 1rem;

  ${(props) => props.theme.response.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;
