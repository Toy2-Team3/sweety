import styled, { DefaultTheme } from "styled-components";
import { ReactComponent as SweetLogo } from "../../assets/sweetyLogo.svg";
import { Container } from "./StartPage";
import { CorrectText, GreetingText, WarnText } from "./SignUpIDPW";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { idState, pwState } from "../../recoil/atoms";
import { useNavigate } from "react-router-dom";
// import { UploadImage, getImageDownloadURL } from "../../utils/firebase";
// import axios from "axios";

const mbtiTypes = [
  { value: "ISTJ", label: "ISTJ" },
  { value: "ISFJ", label: "ISFJ" },
  { value: "INFJ", label: "INFJ" },
  { value: "INTJ", label: "INTJ" },
  { value: "ISTP", label: "ISTP" },
  { value: "ISFP", label: "ISFP" },
  { value: "INFP", label: "INFP" },
  { value: "INTP", label: "INTP" },
  { value: "ESTP", label: "ESTP" },
  { value: "ESFP", label: "ESFP" },
  { value: "ENFP", label: "ENFP" },
  { value: "ENTP", label: "ENTP" },
  { value: "ESTJ", label: "ESTJ" },
  { value: "ESFJ", label: "ESFJ" },
  { value: "ENFJ", label: "ENFJ" },
  { value: "ENTJ", label: "ENTJ" },
];

const jobOptions = [
  { value: "무직", label: "무직" },
  { value: "학생", label: "학생" },
  { value: "회사원", label: "회사원" },
  { value: "자영업", label: "자영업" },
  { value: "전문직", label: "전문직" },
  { value: "공무원", label: "공무원" },
  { value: "기타", label: "기타" },
];

const alcholOptions = [
  { value: "N", label: "안마셔요" },
  { value: "S", label: "가끔 마셔요" },
  { value: "O", label: "자주 마셔요" },
];

const smokingOptions = [
  { value: false, label: "안해요" },
  { value: true, label: "해요" },
];

interface ButtonProps {
  //   profileImage: File | undefined;
  userName: string;
  //   birthday: Date | null;
  //   selectedGender: string;
  //   selectedRegion: string;
  isNameValid: boolean;
}

interface SignUpSpecificProps {
  theme: DefaultTheme;
}

// interface signUpProps {
//   id: string;
//   password: string;
//   name: string;
//   picture: string;
// }

function SignUpSpecific({ theme }: SignUpSpecificProps) {
  const [id] = useRecoilState(idState);
  const [pw] = useRecoilState(pwState);
  //   const [profileImage, setProfileImage] = useState<File>();
  //   const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  //   const [birthday, setBirthday] = useState<Date | null>(null);
  //   const [selectedGender, setSelectedGender] = useState("");
  //   const [selectedRegion, setSelectedRegion] = useState("");

  //   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const files = event.target.files;
  //     if (files && files.length > 0) {
  //       const imageFile = files[0];
  //       setProfileImage(imageFile);
  //     }
  //   };

  const isNameValid = (userName: string) => {
    if (userName.length > 20) return false;
    const nameRegex = /^[A-Za-z가-힣]+$/;
    return nameRegex.test(userName);
  };

  const navigate = useNavigate();

  //   const signUp = async (
  //     id: string,
  //     password: string,
  //     name: string,
  //     picture: string,
  //   ): Promise<signUpProps> => {
  //     try {
  //       const response = await axios.post(
  //         "https://fastcampus-chat.net/signup",
  //         {
  //           id,
  //           password,
  //           name,
  //           picture,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             serverId: process.env.REACT_APP_SERVER_ID,
  //           },
  //         },
  //       );

  //       if (response.status === 200 && response.data.message === "User created") {
  //         if (profileImage) {
  //           try {
  //             // TODO: 파일 업로드 로직 작성

  //             // 이미지 다운로드 URL을 가져오는 부분
  //             const downloadURL = await getImageDownloadURL(id);
  //             setProfileImageUrl(downloadURL);
  //           } catch (error) {
  //             console.error("Error getting image download URL:", error);
  //             // 이미지 업로드에 실패했을 때의 처리를 여기에 추가하세요.
  //           }
  //         }
  //       } else {
  //         // 회원가입이 실패한 경우에 대한 처리를 여기에 추가하세요.
  //         console.error("User creation failed:", response.data.message);
  //       }
  //     } catch (error) {
  //       console.error("Sign-up error:", error);
  //       // 오류가 발생한 경우에 대한 처리를 여기에 추가하세요.
  //     }

  //     // 여기에 반환할 값이 없는 경우에 대한 처리를 추가하세요.
  //     return {
  //       id,
  //       password,
  //       name,
  //       picture,
  //       // 반환할 값
  //     };
  //   };

  return id && pw ? (
    <Container style={{ gap: "18px" }}>
      <GreetingText>환영합니다🎉</GreetingText>

      <div style={{ position: "relative" }}>
        <p>키</p>
        <NameInput
          placeholder="키를 입력해주세요"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        {userName ? (
          isNameValid(userName) ? (
            <CorrectText>정말 매력적인 이름이네요!</CorrectText>
          ) : (
            <WarnText>영문, 한글 조합 20자 이하입니다</WarnText>
          )
        ) : null}
      </div>
      <div>
        <p>MBTI</p>
        <RegionSelect
          defaultValue=""
          //   onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option
            value=""
            disabled
            selected
            hidden
            style={{ color: theme.color.darkGray }}
          >
            MBTI를 선택해주세요
          </option>
          {mbtiTypes.map((region) => (
            <RegionOption key={region.value} value={region.value}>
              {region.label}
            </RegionOption>
          ))}
        </RegionSelect>
      </div>
      <div>
        <p>직업</p>
        <RegionSelect
          defaultValue=""
          //   onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option
            value=""
            disabled
            selected
            hidden
            style={{ color: theme.color.darkGray }}
          >
            해당하는 직업을 선택해주세요
          </option>
          {jobOptions.map((region) => (
            <RegionOption key={region.value} value={region.value}>
              {region.label}
            </RegionOption>
          ))}
        </RegionSelect>
      </div>
      <BirthGenderWrapper>
        <div>
          <p>음주</p>
          <RegionSelect
            style={{ width: "150px" }}
            defaultValue=""
            // onChange={(e) => setSelectedRegion(e.target.value)}
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
            {alcholOptions.map((region) => (
              <RegionOption key={region.value} value={region.value}>
                {region.label}
              </RegionOption>
            ))}
          </RegionSelect>
        </div>
        <div>
          <p>흠연</p>
          <RegionSelect
            style={{ width: "150px" }}
            defaultValue=""
            // onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option
              value=""
              disabled
              selected
              hidden
              style={{ color: theme.color.darkGray }}
            >
              흠연은 하시나요?
            </option>
            {smokingOptions.map((region) => (
              <RegionOption
                key={String(region.value)}
                value={String(region.value)}
              >
                {region.label}
              </RegionOption>
            ))}
          </RegionSelect>
        </div>
      </BirthGenderWrapper>
      <SignUpButton
        // profileImage={profileImage}
        userName={userName}
        isNameValid={isNameValid(userName)}
        // birthday={birthday}
        // selectedGender={selectedGender}
        // selectedRegion={selectedRegion}
        // onClick={async () => {
        //   if (profileImage) {
        //     try {
        //       await UploadImage({
        //         imageName: id,
        //         file: profileImage,
        //       });
        //       const downloadURL = await getImageDownloadURL(id);
        //       setProfileImageUrl(downloadURL);
        //       await signUp(id, pw, userName, profileImageUrl);
        //     } catch (error) {
        //       console.error("Image upload error:", error);
        //     }
        //   }
        // }}
      >
        회원가입
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
    // profileImage,
    isNameValid,
    // selectedRegion,
  }) =>
    isNameValid
      ? (props) => props.theme.color.primary
      : (props) => props.theme.color.darkGray};
  cursor: ${({
    // profileImage,
    isNameValid,

    // selectedRegion,
  }) => (isNameValid ? "pointer" : "default")};
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
