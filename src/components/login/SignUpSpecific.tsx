import styled, { DefaultTheme } from "styled-components";
import { ReactComponent as SweetLogo } from "../../assets/sweetyLogo.svg";
import { Container } from "./StartPage";
import { CorrectText, GreetingText, WarnText } from "./SignUpIDPW";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  birthdayState,
  idState,
  profileImageState,
  pwState,
  selectedGenderState,
  selectedRegionState,
  userNameState,
} from "../../recoil/atoms";

const regions = [
  { value: "강원", label: "강원" },
  { value: "경기", label: "경기" },
  { value: "광주", label: "광주" },
  { value: "대구", label: "대구" },
  { value: "대전", label: "대전" },
  { value: "부산", label: "부산" },
  { value: "서울", label: "서울" },
  { value: "세종", label: "세종" },
  { value: "울산", label: "울산" },
  { value: "인천", label: "인천" },
  { value: "전남", label: "전남" },
  { value: "전북", label: "전북" },
  { value: "제주", label: "제주" },
  { value: "충남", label: "충남" },
  { value: "충북", label: "충북" },
  { value: "해외", label: "해외" },
];

const genderOptions = [
  { value: "male", label: "남성" },
  { value: "female", label: "여성" },
  // 더 많은 성별 옵션을 추가할 수 있습니다.
];

interface ButtonProps {
  profileImage: File | undefined;
  userName: string;
  birthday: Date | null;
  selectedGender: string;
  selectedRegion: string;
  isNameValid: boolean;
}

interface SignUpSpecificProps {
  theme: DefaultTheme;
}

function SignUpSpecific({ theme }: SignUpSpecificProps) {
  const [id] = useRecoilState(idState);
  const [pw] = useRecoilState(pwState);
  const [profileImage, setProfileImage] = useRecoilState(profileImageState);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [birthday, setBirthday] = useRecoilState(birthdayState);
  const [selectedGender, setSelectedGender] =
    useRecoilState(selectedGenderState);
  const [selectedRegion, setSelectedRegion] =
    useRecoilState(selectedRegionState);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageFile = files[0];
      setProfileImage(imageFile);
    }
  };

  const isNameValid = (userName: string) => {
    if (userName.length > 20) return false;
    const nameRegex = /^[A-Za-z가-힣]+$/;
    return nameRegex.test(userName);
  };

  const navigate = useNavigate();
  const navigateToSignUpSpecific = () => {
    if (
      profileImage &&
      isNameValid(userName) &&
      birthday &&
      selectedGender &&
      selectedRegion
    ) {
      navigate("/signup3");
    }
  };

  return id && pw ? (
    <Container style={{ gap: "18px" }}>
      <GreetingText>환영합니다🎉</GreetingText>
      <ProfileWrapper>
        <label htmlFor="profile">
          <ProfileUploadButton
            style={{ backgroundImage: `url(${profileImage})` }}
          />
          {/*카메라 아이콘 넣기 */}
        </label>
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
      <BirthGenderWrapper>
        <div>
          <p>생년월일</p>
          <Birthday
            value={birthday ? birthday.toISOString().split("T")[0] : ""}
            type="date"
            onChange={(e) => setBirthday(new Date(e.target.value))}
          />
        </div>
        <div>
          <p>성별</p>
          {genderOptions.map((option) => (
            <GenderButton
              key={option.value}
              onClick={() => setSelectedGender(option.value)}
              style={{
                background:
                  selectedGender === option.value
                    ? theme.color.primary
                    : theme.color.darkGray,
                marginRight: "9px",
              }}
            >
              {option.label}
            </GenderButton>
          ))}
        </div>
      </BirthGenderWrapper>
      <div>
        <p>지역</p>
        <RegionSelect
          defaultValue=""
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
            <RegionOption key={region.value} value={region.value}>
              {region.label}
            </RegionOption>
          ))}
        </RegionSelect>
      </div>
      <SignUpButton
        profileImage={profileImage}
        userName={userName}
        isNameValid={isNameValid(userName)}
        birthday={birthday}
        selectedGender={selectedGender}
        selectedRegion={selectedRegion}
        onClick={navigateToSignUpSpecific}
      >
        다음
      </SignUpButton>
    </Container>
  ) : (
    <RootErrorMessageWrapper>
      <SweetLogo />
      <RootErrorMessage>
        올바른 경로로 회원가입을 진행해주세요🥲
      </RootErrorMessage>
      <GobackLink onClick={() => navigate("/startPage")}>
        회원가입으로 돌아가기
      </GobackLink>
    </RootErrorMessageWrapper>
  );
}

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileUploadButton = styled.div`
  width: 125px;
  height: 125px;
  border-radius: 50%;
  background: ${(props) => props.theme.color.darkGray};
  cursor: pointer;
  background-size: cover;
  background-position: center;
`;
const ProfileInput = styled.input`
  display: none;
`;

const NameInput = styled.input`
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

const BirthGenderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 340px;
`;

const Birthday = styled.input`
  width: 170px;
  height: 50px;
  padding: 0 23px;
  border: 1px solid ${(props) => props.theme.color.borderGray};
  border-radius: 12px;
  background: #fff;
  &:focus {
    border: ${(props) => props.theme.color.primary} 1px solid;
    outline: none;
  }
`;

const GenderButton = styled.button`
  width: 60px;
  height: 50px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background: ${(props) => props.theme.color.darkGray};
`;

const RegionSelect = styled.select`
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

const RegionOption = styled.option`
  width: 340px;
  height: 150px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.color.borderGray};
  background: #fff;
`;

const SignUpButton = styled.button<ButtonProps>`
  width: 340px;
  height: 50px;
  color: white;
  border: none;
  border-radius: 12px;
  background: ${({
    profileImage,
    isNameValid,
    birthday,
    selectedGender,
    selectedRegion,
  }) =>
    profileImage && isNameValid && birthday && selectedGender && selectedRegion
      ? (props) => props.theme.color.primary
      : (props) => props.theme.color.darkGray};
  cursor: ${({
    profileImage,
    isNameValid,
    birthday,
    selectedGender,
    selectedRegion,
  }) =>
    profileImage && isNameValid && birthday && selectedGender && selectedRegion
      ? "pointer"
      : "default"};
`;

const RootErrorMessageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RootErrorMessage = styled.h1`
  font-size: 32px;
`;

const GobackLink = styled.button`
  padding: 10px;
  width: 200px;
  height: 50px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.color.primary};
  color: white;
  border: none;
  cursor: pointer;
`;

export default SignUpSpecific;
