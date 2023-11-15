import styled, { DefaultTheme } from "styled-components";
import { regions, genderOptions } from "../../constants/constant";
import { isNameValid } from "../../utils/registerFunction";
import { CorrectText, WarnText } from "../login/SignUpIDPW";
import { isTallValid } from "../../utils/registerFunction";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { getUserData } from "../../utils/firebase";
import {
  alcoholState,
  birthdayState,
  jobState, 
  mbtiState, 
  profileImageState, 
  selectedGenderState, 
  selectedRegionState, 
  smokingState, 
  tallState, 
  userNameState,
} from "../../recoil/atoms";
import {
  alcoholOptions,
  compatibilityMessages,
  jobOptions,
  mbtiTypes,
  smokingOptions,
} from "../../constants/constant";

interface SignUpSpecificProps {
  theme: DefaultTheme;
}

export default function RequiredInformation({ theme, onImageChange }: SignUpSpecificProps & { onImageChange: () => void }) {
  const [prevProfileImageUrl, setPrevProfileImageUrl] = useState("")
  const [, setProfileImage] = useRecoilState(profileImageState)
  const [newProfileImageUrl, setNewProfileImageUrl] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [birthday, setBirthday] =  useRecoilState(birthdayState);
  const [selectedGender, setSelectedGender] =  useRecoilState(selectedGenderState);
  const [selectedRegion, setSelectedRegion] =  useRecoilState(selectedRegionState);
  const [job, setJob] =  useRecoilState(jobState);
  const [tall, setTall] =  useRecoilState(tallState);
  const [mbti, setMbti] =  useRecoilState(mbtiState);
  const [alcohol, setAlcohol] =  useRecoilState(alcoholState);
  const [smoking, setSmoking] =  useRecoilState(smokingState);
  const id = sessionStorage.getItem('id');

  const getUserInformation = async (): Promise<void> => {
    if(id) {
      const userData = await getUserData(id);

      if (userData) {
        setPrevProfileImageUrl(userData.profileUrl);
        setUserName(userData.nickName);
        setAlcohol(userData.alcohol);
        setBirthday(userData.birth);
        setSelectedGender(userData.gender);
        setSelectedRegion(userData.region);
        setJob(userData.job);
        setTall(userData.tall);
        setMbti(userData.mbti);
        setSmoking(userData.smoking);
      }
    }
  };

  useEffect(() => {
    getUserInformation();
  }, [id]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageFile = files[0];
      setProfileImage(imageFile);
      setNewProfileImageUrl(URL.createObjectURL(imageFile));
      onImageChange();
      setIsUploaded(true);
    }
  };

  return (
    <RequiredInformationWrap>
      <ProfileWrapper>
        <ProfileUploadLabel
          backgroundImage={isUploaded ? newProfileImageUrl : prevProfileImageUrl}
          htmlFor="profile"
        >
        </ProfileUploadLabel>
        <ProfileInput
          type="file"
          id="profile"
          onChange={handleImageUpload}
          accept=".jpg, .jpeg, .png"
        />
      </ProfileWrapper>
      <div style={{ position: "relative" }}>
        <p>닉네임</p>
        <NameInput
          placeholder="닉네임을 입력해주세요"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        {userName ? (
          isNameValid(userName) ? (
            <CorrectText>정말 매력적인 닉네임이네요!</CorrectText>
          ) : (
            <WarnText>영문, 한글 조합 20자 이하입니다</WarnText>
          )
        ) : null}
      </div>
      <TwoColumnWrapper>
        <div>
          <p>생년월일</p>
          <Birthday>{birthday}</Birthday>
        </div>
        <div>
          <p>성별</p>
          {genderOptions.map((option) => (
            <GenderButton
              key={option.value}
              style={{
                background:
                  selectedGender === option.value
                    ? theme.color.primary
                    : theme.color.lightGray,
                marginRight: "9px",
              }}
            >
              {option.label}
            </GenderButton>
          ))}
        </div>
        <WarnText>
          생년월일과 성별은 변경하실 수 없습니다.
        </WarnText>
      </TwoColumnWrapper>
      <div>
        <p>지역</p>
        <SelectBox
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option
            value=""
            disabled
            selected
            hidden
            style={{ color: theme.color.darkGray }}
          >
            거주지역을 선택해주세요
          </option>
          {regions.map((region) => (
            <OptionBox key={region.value} value={region.value}>
              {region.label}
            </OptionBox>
          ))}
        </SelectBox>
      </div>
      <div style={{ position: "relative" }}>
        <p>키</p>
        <NameInput
          placeholder="키를 입력해주세요"
          value={tall}
          onChange={(e) => setTall(e.target.value)}
        />
        {tall ? (
          isTallValid(String(tall)) ? (
            <CorrectText>{tall}cm</CorrectText>
          ) : (
            <WarnText>100~250사이의 숫자만 입력해 주세요</WarnText>
          )
        ) : null}
      </div>
      <div style={{ position: "relative" }}>
        <p>MBTI</p>
        <SelectBox value={mbti} onChange={(e) => setMbti(e.target.value)}>
          <option
            value=""
            disabled
            selected
            hidden
            style={{ color: theme.color.darkGray }}
          >
            {mbti}
          </option>
          {mbtiTypes.map((mbti) => (
            <OptionBox key={mbti.value} value={mbti.value}>
              {mbti.label}
            </OptionBox>
          ))}
        </SelectBox>
        {mbti ? <CorrectText style={{whiteSpace:'nowrap'}}>{compatibilityMessages[mbti]}</CorrectText> : null}
      </div>
      <div>
        <p>직업</p>
        <SelectBox value={job} onChange={(e) => setJob(e.target.value)}>
          <option
            value=""
            disabled
            selected
            hidden
            style={{ color: theme.color.darkGray }}
          >
            해당하는 직업을 선택해주세요
          </option>
          {jobOptions.map((job) => (
            <OptionBox key={job.value} value={job.value}>
              {job.label}
            </OptionBox>
          ))}
        </SelectBox>
      </div>
      <TwoColumnWrapper>
        <div>
          <p>음주</p>
          <SelectBox
            style={{ width: "150px" }}
            value={alcohol}
            onChange={(e) => setAlcohol(e.target.value)}
          >
            <option
              value=""
              disabled
              selected
              hidden
              style={{ color: theme.color.darkGray }}
            >
              음주는 하시나요?
            </option>
            {alcoholOptions.map((alcohol) => (
              <OptionBox key={alcohol.value} value={alcohol.value}>
                {alcohol.label}
              </OptionBox>
            ))}
          </SelectBox>
        </div>
        <div>
          <p>흡연</p>
          <SelectBox
            style={{ width: "150px" }}
            value={`${smoking}`}
            onChange={(e) => setSmoking(e.target.value === "true")}
          >
            <option
              value=""
              disabled
              selected
              hidden
              style={{ color: theme.color.darkGray }}
            >
              흡연은 하시나요?
            </option>
            {smokingOptions.map((smoking) => (
              <OptionBox
                key={String(smoking.value)}
                value={String(smoking.value)}
              >
                {smoking.label}
              </OptionBox>
            ))}
          </SelectBox>
        </div>
      </TwoColumnWrapper>
    </RequiredInformationWrap>
  )
}

const RequiredInformationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
`;


const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileUploadLabel = styled.label<{ backgroundImage: string }>`
  width: 125px;
  height: 125px;
  display: flex;
  border-radius: 50%;
  background: ${(props) =>
    props.backgroundImage
      ? `url(${props.backgroundImage})`
      : props.theme.color.darkGray};
  cursor: pointer;
  background-size: cover;
  background-position: center;
  align-items: center;
  justify-content: center;
`;

const ProfileInput = styled.input`
  display: none;
`;

export const NameInput = styled.input`
  display: flex;
  justify-content: center;
  width: 340px;
  height: 50px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.color.borderGray};
  background: #fff;
  padding-left: 16px;
  &:focus {
    border: ${(props) => props.theme.color.primary} 1px solid;
    outline: none;
  }
`;

export const TwoColumnWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 340px;
`;

const Birthday = styled.button`
  width: 170px;
  height: 50px;
  padding: 0 23px;
  border: none;
  border-radius: 12px;
  background: ${(props) => props.theme.color.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.font.smallSize};
`;

const GenderButton = styled.button`
  width: 60px;
  height: 50px;
  border-radius: 12px;
  border: none;
  background: ${(props) => props.theme.color.darkGray};
`;

export const SelectBox = styled.select`
  width: 340px;
  height: 50px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.color.borderGray};
  background: #fff;
  padding-left: 16px;
  &:focus {
    border: ${(props) => props.theme.color.primary} 1px solid;
    outline: none;
  }
`;

export const OptionBox = styled.option`
  width: 340px;
  height: 150px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.color.borderGray};
  background: #fff;
`;

export const RootErrorMessageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RootErrorMessage = styled.h1`
  font-size: 32px;
`;

export const GobackLink = styled.button`
  padding: 10px;
  width: 200px;
  height: 50px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.color.primary};
  color: white;
  border: none;
  cursor: pointer;
`;
