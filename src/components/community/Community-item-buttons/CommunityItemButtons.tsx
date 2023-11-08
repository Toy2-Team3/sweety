import React from 'react';
import styled from 'styled-components';
import { IButtonType } from '../community-item/CommunityItem';

const ButtonWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 1rem;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Button = styled.button<{ $left?: boolean }>`
  background: ${(props) => (props.$left ? '#777777' : '#D94E28')};

  white-space: nowrap;
  color: white;
  font-size: 1.1rem;

  border: transparent;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);

  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;

  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1rem;
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
