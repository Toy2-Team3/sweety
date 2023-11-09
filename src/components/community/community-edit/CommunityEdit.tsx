import React from 'react';
import CommunityItemButtons, {
  ButtonType,
} from '../Community-item-buttons/CommunityItemButtons';
import styled from 'styled-components';

const CommunityEdit = () => {
  const buttonText: ButtonType = {
    left: '초기화',
    right: '등록',
  };

  return (
    <EditWrapper>
      <InputForm>
        <InputWrapper>
          <label htmlFor="title">제목</label>
          <input type="text" placeholder="제목을 입력하세요." id="title" />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="content">내용</label>
          <textarea placeholder="내용을 입력하세요." id="content" />
        </InputWrapper>
      </InputForm>
      <ButtonWrapper>
        <CommunityItemButtons buttonText={buttonText} />
      </ButtonWrapper>
    </EditWrapper>
  );
};

export default CommunityEdit;

const EditWrapper = styled.div`
  width: 100%;
  min-width: 30%;
  height: 80vh;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputForm = styled.form`
  width: 100%;
  /* min-width: 30%; */

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: left;
  align-items: center;

  ${(props) => props.theme.response.mobile} {
    flex-direction: column;
    align-items: start;
  }

  label {
    font-size: 1.8rem;
    font-weight: bold;
    white-space: nowrap;

    ${(props) => props.theme.response.mobile} {
      font-size: 1.5rem;
    }
  }

  input {
    width: 100%;
    padding: 0.5rem;

    border-radius: 0.5rem;
    border: 1px solid #949494;

    font-size: 1.3rem;
  }

  textarea {
    width: 100%;
    height: 10rem;
    padding: 0.5rem;

    border-radius: 0.5rem;
    border: 1px solid #949494;

    font-size: 1rem;
    font-weight: normal;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
`;
