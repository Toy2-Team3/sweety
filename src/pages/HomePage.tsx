import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserInfo from "../components/Home/UserInfo";
import { IUserData, get, getUserData } from "../utils/firebase";
import { selectedGenderState } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import ToastMessage from "../components/common/ToastMessage";

export interface HomeUserInfo {
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

const Home = () => {
  const [gender, setGender] = useRecoilState(selectedGenderState);
  const [users, setUsers] = useState<HomeUserInfo[]>([]);
  const [showToastMsg, setShowToastMsg] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");

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
        let userData: IUserData[] = [];

        // 성별 가져오기
        const id = sessionStorage.getItem("id");
        if (id) {
          const data = await getUserData(id);
          setGender(data!.gender);
        }

        if (gender === "female") {
          userData = await get("user", "gender" as keyof HomeUserInfo, "male");
        } else {
          userData = await get(
            "user",
            "gender" as keyof HomeUserInfo,
            "female",
          );
        }

        const userInfoArray: HomeUserInfo[] = userData.map((user) => ({
          id: user.id,
          userId: user.userId || "",
          password: user.password || "",
          token: user.token || "",
          nickName: user.nickName || "",
          birth: user.birth || "",
          gender: user.gender || "",
          region: user.region || "",
          profileUrl: user.profileUrl || "",
          myChats: user.myChats || [],
          introduction: user.introduction || "",
          interested: user.interested || [],
          status: user.status || "",
          alcohol: user.alcohol || "",
          smoking: user.smoking || false,
          mbti: user.mbti || "",
          job: user.job || "",
          tall: user.tall || 0,
        }));

        const shuffledUsers = shuffleArray(userInfoArray);
        setUsers(shuffledUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [gender]);

  return (
    <Wrapper>
      <Header>
        <div>Home</div>
        <div>좋은 사람과 좋은 날을 만들어보세요.</div>
      </Header>
      <UsersInfo>
        {users.map((user, index) => (
          <UserInfo
            key={index}
            userinfo={user}
            setShowToastMsg={setShowToastMsg}
            setToastMsg={setToastMsg}
          />
        ))}
      </UsersInfo>
      {showToastMsg && <ToastMessage content={toastMsg} />}
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
    margin-bottom: 1rem;

    font-size: 50px;
    font-weight: 700;
    color: ${(props) => props.theme.color.primary};

    ${(props) => props.theme.response.mobile} {
      font-size: 45px;
    }
  }

  > div:nth-child(2) {
    font-size: 20px;

    ${(props) => props.theme.response.mobile} {
      font-size: 17px;
    }
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
