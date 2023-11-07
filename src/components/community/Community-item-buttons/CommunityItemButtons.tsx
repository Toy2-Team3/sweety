import React from 'react';
import styled from 'styled-components';
import { IButtonType } from '../community-item/CommunityItem';

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
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);

  width: 40%;
  height: 100%;
  padding: 0 auto;

  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

interface IButtonProps {
  buttonText: IButtonType;
}

const CommunityItemButtons: React.FC<IButtonProps> = ({ buttonText }) => {
  return (
    <ButtonWrapper>
      <Button $left>{buttonText.left}</Button>
      <Button>{buttonText.right}</Button>
    </ButtonWrapper>
  );
};

export default CommunityItemButtons;
