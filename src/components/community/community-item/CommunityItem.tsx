import React from "react";
import CommunityItemButtons from "../Community-item-buttons/CommunityItemButtons";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-width: 30%;
  max-height: 15rem;
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

  @media (max-width: 480px) {
    gap: 1.5rem;
  }

  div {
    display: flex;
    justify-content: left;

    @media (max-width: 480px) {
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
  }

  p {
    font-size: 1.1rem;
    font-weight: normal;

    ${(props) => props.theme.response.mobile} {
      font-size: ${(props) => props.theme.font.mediumSize};
    }
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

export interface IButtonType {
  left: string;
  right: string;
}

const CommunityItem = () => {
  const buttonText: IButtonType = {
    left: "자세히 보기",
    right: "그룹 채팅 참여",
  };

  return (
    <Container>
      <ItemTop>
        <ItemLeft>
          <ImageWrapper>
            <img
              src="https://www.handmk.com/news/photo/202306/16714_40371_5250.jpg"
              alt="user profile"
            />
          </ImageWrapper>
          <div>
            <h3>이상한 고양이님</h3>
            <span>서울</span>
          </div>
        </ItemLeft>
      </ItemTop>
      <h1>매주 월요일 바이크 타실 분 🚴</h1>
      <p>
        안녕하세요, 바이크 소모임 000입니다! 저희 소모임은 매주 월요일 저녁
        8시에 진행됩니다. 많관부~ 어째저째 길다~~~ 내용이 길게 보입니다.
      </p>
      <div>
        <CommunityItemButtons buttonText={buttonText} />
      </div>
    </Container>
  );
};

export default CommunityItem;
