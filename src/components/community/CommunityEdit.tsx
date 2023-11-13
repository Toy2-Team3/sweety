import React, { useEffect, useRef, useState } from "react";
import CommunityItemButtons, { ButtonText, ButtonType } from "./CommunityItemButtons";
import styled from "styled-components";
import { CommunityData, setCommunityData } from "../../utils/firebase";
import { useRecoilState } from "recoil";
import { idState } from "../../recoil/atoms";
import { useNavigate } from "react-router-dom";

const CommunityEdit = () => {
  const navigate = useNavigate()
    const [id] = useRecoilState(idState);
    const titleInputRef = useRef<HTMLInputElement>(null);
  
    const buttonText: ButtonText = {
      left: "초기화",
      right: "등록",
    };
  
    const buttonType: ButtonType = {
      leftBtnType:"reset",
      rightBtnType:"submit"
    };

  const [inputs, setInputs] = useState<
    Pick<CommunityData, "title" | "content">
  >({
    title: "",
    content: "",
  });

  const handleChange = (e: React.ChangeEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const createdAt = Date.now();
    const userId = id;
    //채팅 생성하려면 본인 제외 다른 참가자들의 id가 필요함.
    //따라서 처음 글 생성할 당시에는 chatId가 존재할 수 없다... ㅜ
    const chatId = "";
    await setCommunityData({
      ...inputs,
      userId,
      chatId,
      createdAt,
    });
    navigate('/community');
  };

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  return (
    <EditWrapper>
      <InputForm onSubmit={handleSubmit}>
        <InputWrapper>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            placeholder="제목..."
            id="title"
            name="title"
            onChange={handleChange}
            ref={titleInputRef}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="content">내용</label>
          <textarea
            placeholder="내용..."
            id="content"
            name="content"
            onChange={handleChange}
          />
        </InputWrapper>
      <ButtonWrapper>
        <CommunityItemButtons buttonText={buttonText} buttonType={buttonType} />
      </ButtonWrapper>
      </InputForm>
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
    font-weight: bold;

    &:focus {
      border:1px solid ${(props) => props.theme.color.primary};
      outline: 1px solid ${(props) => props.theme.color.primary};
    }
  }

  textarea {
    width: 100%;
    height: 10rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #949494;
    font-size: 1rem;
    font-weight: normal;

    &:focus {
      border:1px solid ${(props) => props.theme.color.primary};
      outline: 1px solid ${(props) => props.theme.color.primary};
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
`;
