import React from 'react';
import styled from 'styled-components';
import CommunityItemButtons from '../Community-item-buttons/CommunityItemButtons';

const ModalWrapper = styled.div`
  max-height: 20rem;
  max-width: 50%;
  min-width: 30%;
  padding: 3rem 3rem;

  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: left;
  gap: 1rem;

  border: 1px solid black;
  /* border: transparent; */
  border-radius: 1rem;

  div {
    display: flex;
    justify-content: right;
  }
`;

const CommunityModal = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ModalWrapper>
        <h1>매주 월요일 바이크 타실 분</h1>
        <p>
          안녕하세요, 바이크 소모임 000입니다! 저희 소모임은 매주 월요일 저녁
          8시에 진행됩니다. 많관부~ 어째저째 길다~~~ 내용이 길게 보입니다.
        </p>
        <div>
          <CommunityItemButtons />
        </div>
      </ModalWrapper>
    </div>
  );
};

export default CommunityModal;
