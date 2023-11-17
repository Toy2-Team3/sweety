import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CommunityData, getSingleData, updateData } from "../../utils/firebase";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/joy/Button";

const CommunityUpdate = () => {
  const params = useParams();
  const docId = params.id as string;
  const navigate = useNavigate();
  const titleInputRef = useRef<HTMLInputElement>(null);

  const [inputs, setInputs] = useState<
    Pick<CommunityData, "title" | "content" | "createdAt">
  >({
    title: "",
    content: "",
    createdAt: 0,
  });

  const handleChange = (e: React.ChangeEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const createdAt = Date.now();
    await updateData(docId, {
      ...inputs,
      createdAt,
    });
    navigate("/community");
  };

  const fetchData = async () => {
    const response = await getSingleData("community", docId);
    if (response) {
      setInputs(response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            defaultValue={inputs.title}
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
            defaultValue={inputs.content}
            onChange={handleChange}
          />
        </InputWrapper>
        <ButtonWrapper>
          <div>
            <Button
              variant="outlined"
              color="neutral"
              size="lg"
              sx={{ width: 1 / 2 }}
              onClick={() => navigate("/community")}
            >
              뒤로 가기
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              size="lg"
              sx={{ width: 1 / 2 }}
            >
              저장
            </Button>
          </div>
        </ButtonWrapper>
      </InputForm>
    </EditWrapper>
  );
};

export default CommunityUpdate;

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
