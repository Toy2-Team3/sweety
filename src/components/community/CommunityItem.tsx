import React, { FC, useState } from "react";
import styled from "styled-components";
import CommunityModal from "./CommunityModal";
import { CommonData } from "../../pages/CommunityListPage";

interface CommunityItemProps {
  item: CommonData;
  setShowToastMsg: (value: boolean) => void;
  setToastMsg: (content: string) => void;
}

const CommunityItem: FC<CommunityItemProps> = ({
  item,
  setShowToastMsg,
  setToastMsg,
}) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);

  const handleOpenPostModal = () => {
    setIsPostModalOpen(true);
  };

  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
  };

  return (
    <div>
      <Container onClick={handleOpenPostModal}>
        <ItemTop>
          <ItemLeft>
            <ImageWrapper>
              <img src={item.profileUrl} alt="user image" />
            </ImageWrapper>
            <div>
              <h3>{item.nickName}</h3>
              <span>{item.region}</span>
            </div>
          </ItemLeft>
        </ItemTop>
        <h1>{item.title}</h1>
        <p>{item.content}</p>
      </Container>
      {isPostModalOpen && (
        <CommunityModal
          item={item}
          isPostModalOpen={isPostModalOpen}
          handleClosePostModal={handleClosePostModal}
          setShowToastMsg={setShowToastMsg}
          setToastMsg={setToastMsg}
        />
      )}
    </div>
  );
};

export default CommunityItem;

const Container = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: left;
  gap: 1rem;
  border: transparent;
  border-radius: 1rem;
  box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.5);
  position: relative;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.03);
    cursor: pointer;
  }
  > div:last-child {
    display: flex;
    justify-content: left;
    ${(props) => props.theme.response.mobile} {
      justify-content: center;
    }
  }
  h1,
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h1 {
    font-size: 1.6rem;
    font-weight: bold;
    ${(props) => props.theme.response.mobile} {
      font-size: 1.4rem;
    }
  }
  p {
    font-size: 1.1rem;
    font-weight: normal;
    ${(props) => props.theme.response.tablet} {
      width: 100%;
      line-height: 1.3rem;
      white-space: normal;
      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  ${(props) => props.theme.response.mobile} {
    font-size: ${(props) => props.theme.font.mediumSize};
  }
`;

const ItemTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ItemLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 1rem;
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin-right: 0.5rem;
    }
    span {
      color: #949494;
      font-size: 1rem;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${(props) => props.theme.response.mobile} {
    width: 3.3rem;
    height: 3.3rem;
  }
`;
