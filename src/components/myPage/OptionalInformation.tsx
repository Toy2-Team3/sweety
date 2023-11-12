import styled from "styled-components";
import { useState } from "react";
import ToastMessage from "../common/ToastMessage";
import { interested } from "../../constants/constant";
import { interestedTagsState, introductionState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

interface TagProps {
  selected: boolean;
}

export default function OptionalInformation() {
  const [inputCount, setInputCount] = useState(0);
  const [introduction, setIntroduction] = useRecoilState(introductionState);
  const [selectedTags, setSelectedTags] = useRecoilState(interestedTagsState);
  const [showToast, setShowToast] = useState(false);

  const handleIntroductionInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
    setIntroduction(e.target.value);
  }
  
  const handleTagClick = (value: string) => {
    const tagIndex = selectedTags.indexOf(value);

    if (tagIndex !== -1) {
      const newTags = [...selectedTags];
      newTags.splice(tagIndex, 1);
      setSelectedTags(newTags);
    } else {
      if (selectedTags.length < 5) {
        setSelectedTags([...selectedTags, value]);
      } else {
        setShowToast(true); 

        setTimeout(() => {
          setShowToast(false);
      }, 2000);
      }
    }
    console.log(introduction, selectedTags);
  };

  return (
    <OptionalInformationWrap>
      <div>
        <p>자기소개</p>
        <Introduction
          placeholder="자기소개를 입력해주세요"
          maxLength={60}
          value={introduction}
          onChange={handleIntroductionInput}
        />
        <Length>
          <span>{inputCount}</span> 
          <span>/60자</span>
        </Length>
      </div>
        <div>
        <p>관심사</p>
        <Condition>(최대 5개 선택)</Condition>
        <TagWrap>
          {interested.map((inter) => (
            <Tag
              key={inter.label}
              onClick={() => handleTagClick(inter.value)}
              selected={selectedTags.includes(inter.value)}
            >
              {inter.value}
            </Tag>
          ))}
        </TagWrap>
      </div>
      {
        showToast &&
          <ToastMessage 
            content="관심사는 최대 5개 선택 가능합니다."
          />
      }
    </OptionalInformationWrap>
  )
}

const OptionalInformationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
`;

const Introduction = styled.textarea`
  width: 340px;
  height: 82px;
  resize: none;
  border-radius: 12px;
  padding: 16px;

  &:focus {
    border: ${(props) => props.theme.color.primary} 1px solid;
    outline: none;
  }
`;

const Length = styled.p`
  display: flex;
  justify-content: flex-end;
  font-size: ${(props) => props.theme.font.smallSize};
  color: ${(props) => props.theme.color.borderGray};
`;

const TagWrap = styled.div`
  padding: 0.5rem;
`;

const Condition = styled.span`
  display: inline-block;
  margin-top: 0.3rem;
  font-size: ${(props) => props.theme.font.smallSize};
  color: ${(props) => props.theme.color.borderGray};
`;

const Tag = styled.span<TagProps>`
  display: inline-block;
  border-radius: 6px;
  margin: 0.3rem;
  padding: 0.3rem;
  background-color: ${(props) =>
    props.selected ? 
      props.theme.color.primary : 
      props.theme.color.darkGray
    };
  color: ${(props) =>
    props.selected ? 
      props.theme.color.white : 
      props.theme.color.black
    };  

  &:hover {
    cursor: pointer;
  }
`;