import React from 'react';
import styled from 'styled-components';
import { IButtonType } from '../community-item/CommunityItem';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 1rem;

  ${(props) => props.theme.response.mobile} {
    width: 100%;
  }
`;

export const Button = styled.button<{ $left?: boolean }>`
  background: ${(props) => (props.$left ? '#777777' : '#D94E28')};

  flex: 1;

  white-space: nowrap;
  color: white;
  font-size: 1.1rem;

  border: transparent;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);

  padding: 0.6rem 1rem;

  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  ${(props) => props.theme.response.tablet} {
    font-size: ${(props) => props.theme.font.mediumSize};
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
