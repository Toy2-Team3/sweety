import React from 'react';
// import CommunityEdit from './community-edit/CommunityEdit';
import CommunityItem from './community-item/CommunityItem';
// import CommunityModal from './community-modal/CommunityModal';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 5rem 5rem 0 5rem;

  ${(props) => props.theme.response.mobile} {
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

const Container = styled.div`
  width: 100%;
`;

const index = () => {
  return (
    <Wrapper>
      <Header>
        <div>Community</div>
        <div>소통하셈</div>
      </Header>
      {/* <CommunityModal /> */}
      <Container>
        <CommunityItem />
        <CommunityItem />
        <CommunityItem />
      </Container>
      {/* <CommunityEdit /> */}
    </Wrapper>
  );
};

export default index;
