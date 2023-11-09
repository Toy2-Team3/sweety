import React from 'react';
import styled from 'styled-components';

const CommunityItem = () => {
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
            <h3>이상한 고양이</h3>
            <span>서울</span>
          </div>
        </ItemLeft>
      </ItemTop>
      <h1>매주 월요일 바이크 타실 분 🚴</h1>
      <p>
        안녕하세요, 바이크 소모임 000입니다! 저희 소모임은 매주 월요일 저녁
        8시에 진행됩니다. 많관부~ 어째저째 길다~~~ 내용이 길게 보입니다.
      </p>
    </Container>
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
    transform: scale(1.05);
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
