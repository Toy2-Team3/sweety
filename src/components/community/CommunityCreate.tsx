import React from 'react';
import styled from 'styled-components';
import CommunityEdit from './community-edit/CommunityEdit';

const CommunityCreate = () => {
  return (
    <Wrapper>
      <Header>
        <div>Community</div>
        <div>당신의 관심사를 공유해보세요</div>
      </Header>
      <CommunityEdit />
    </Wrapper>
  );
};

export default CommunityCreate;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 5rem;

  ${(props) => props.theme.response.tablet} {
    padding: 3rem;
  }

  ${(props) => props.theme.response.mobile} {
    padding: 2rem;
  }
`;

const Header = styled.div`
  margin-bottom: 3rem;

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
