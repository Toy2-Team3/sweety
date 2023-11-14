import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  CommunityData,
  setCommunityData,
  updateData,
} from "../../utils/firebase";
import { useRecoilState } from "recoil";
import { idState } from "../../recoil/atoms";
import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
import axios from "axios";

interface User {
  id: string;
  name: string;
  picture: string;
}

interface CreateChatRequestBody {
  name: string;
  users: string[];
  isPrivate?: boolean;
}

interface ChatResponse {
  id: string;
  name: string;
  users: User[];
  isPrivate: boolean;
  updatedAt: Date;
  message?: string;
}

const CommunityCreate = () => {
  const navigate = useNavigate();
  const [id] = useRecoilState(idState);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const [inputs, setInputs] = useState<
    Pick<CommunityData, "title" | "content">
  >({
    title: "",
    content: "",
  });

  //그룹채팅방 생성하는 함수
  const CreateGroupChat = async (
    inputs: Pick<CommunityData, "title" | "content">,
  ) => {
    const ACCESS_TOKEN = sessionStorage.getItem("accessToken");

    try {
      const requestBody: CreateChatRequestBody = {
        name: `${inputs.title}의 그룹 채팅` as string,
        users: [],
        isPrivate: false,
      };

      const response = await axios.post<ChatResponse>(
        "https://fastcampus-chat.net/chat",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            serverId: process.env.REACT_APP_SERVER_ID,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        },
      );

      if (response.status === 200) {
        console.log("요청 성공", response);
        return response.data.id;
        // setNewChatId(response.data.id);
        // console.log("새로운 채팅방 생성 성공");
      } else {
        console.log("요청 실패", response);
        return "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await CreateGroupChat(inputs);

    const createdAt = Date.now();
    const userId = id;
    const chatId = response;

    await setCommunityData({
      ...inputs,
      userId,
      chatId,
      createdAt,
    });

    navigate("/community");
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
          <div>
            <Button
              type="reset"
              variant="outlined"
              color="neutral"
              size="lg"
              sx={{ width: 1 / 2 }}
            >
              초기화
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              size="lg"
              sx={{ width: 1 / 2 }}
            >
              등록
            </Button>
          </div>
        </ButtonWrapper>
      </InputForm>
    </EditWrapper>
  );
};

export default CommunityCreate;

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
      border: 1px solid ${(props) => props.theme.color.primary};
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
      border: 1px solid ${(props) => props.theme.color.primary};
      outline: 1px solid ${(props) => props.theme.color.primary};
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;

  div {
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: right;
    gap: 1rem;
    ${(props) => props.theme.response.tablet} {
      width: 50%;
    }
    ${(props) => props.theme.response.mobile} {
      width: 100%;
    }
  }
`;
