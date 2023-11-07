import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  width: 30%;
  height: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 1rem;
`;

const Button = styled.button<{ $left?: boolean }>`
  background: ${(props) => (props.$left ? '#777777' : '#D94E28')};

  color: white;
  border: transparent;
  border-radius: 0.5rem;

  width: 40%;
  height: 100%;
  padding: 0 auto;
`;

const CommunityItemButtons = () => {
  return (
    <ButtonWrapper>
      <Button $left>버튼1</Button>
      <Button>버튼2</Button>
    </ButtonWrapper>
  );
};

export default CommunityItemButtons;
