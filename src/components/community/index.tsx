import React from 'react';
// import CommunityEdit from './community-edit/CommunityEdit';
// import CommunityItem from './community-item/CommunityItem';
import CommunityModal from './community-modal/CommunityModal';
// import styled from 'styled-components';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

const index = () => {
  return (
    <div>
      <CommunityModal />
      {/* map 돌리기 */}
      {/* <Container>
        <CommunityItem />
        <CommunityItem />
        <CommunityItem />
      </Container>
      <CommunityEdit /> */}
    </div>
  );
};

export default index;
