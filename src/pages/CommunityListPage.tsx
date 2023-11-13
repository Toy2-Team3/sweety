import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CommunityItem from "../components/community/CommunityItem";
import {
  CommunityData,
  IUserData,
  getAllData,
  getAllDataOrderByDate,
} from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { CommunityButton } from "../styles/community.style";

export interface CommonData {
  id: string;
  chatId?: string;
  userId?: string;
  title?: string;
  content?: string;
  createdAt?: number;
  nickName?: string;
  profileUrl?: string;
  region?: string;
}

const CommunityList = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState<CommunityData[]>([]);
  const [userList, setUserList] = useState<IUserData[]>([]);
  const [commonList, setCommonList] = useState<CommonData[]>([]);

  const handleCreateNewItem = () => {
    navigate("/community/edit");
  };

  const fetchCommunityData = async () => {
    const response = await getAllDataOrderByDate();
    setPostList(response);
  };

  const fetchUserData = async () => {
    const response = await getAllData("user");
    setUserList(response);
  };

  function findCommonData(userList: IUserData[], postList: CommunityData[]) {
    return postList.reduce((result: CommonData[], post) => {
      const matchingUser = userList.find((user) => post.userId === user.userId);
      if (matchingUser) {
        result.push({
          ...post,
          nickName: matchingUser.nickName,
          profileUrl: matchingUser.profileUrl,
          region: matchingUser.region,
        });
      }
      return result;
    }, []);
  }

  useEffect(() => {
    fetchCommunityData();
    fetchUserData();
  }, []);

  useEffect(() => {
    const newList = findCommonData(userList, postList);
    setCommonList(newList);
  }, [postList, userList]);

  return (
    <Wrapper>
      <Header>
        <div>Community</div>
        <div>당신의 관심사를 공유해보세요</div>
      </Header>
      <AddButtonWrapper>
        <AddButton onClick={handleCreateNewItem}>새 글 등록</AddButton>
      </AddButtonWrapper>
      <ItemWrapper>
        {commonList.map((item) => {
          return <CommunityItem key={item.id} item={item} />;
        })}
      </ItemWrapper>
    </Wrapper>
  );
};

export default CommunityList;

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

const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
`;

const AddButton = styled(CommunityButton)`
  padding: 0.5rem 2rem;
  flex: 0;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
