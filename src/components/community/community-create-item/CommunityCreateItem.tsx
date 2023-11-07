import React from 'react';
import CommunityItemButtons from '../Community-item-buttons/CommunityItemButtons';
import styled from 'styled-components';

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const CommunityCreateItem = () => {
  return (
    <div>
      <InputForm>
        <label>제목</label>
        <input type="text" placeholder="제목을 입력하세요." />
        <label>내용</label>
        <textarea placeholder="내용을 입력하세요." />
      </InputForm>
      <CommunityItemButtons />
    </div>
  );
};

export default CommunityCreateItem;
