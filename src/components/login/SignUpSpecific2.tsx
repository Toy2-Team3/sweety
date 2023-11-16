import { ReactComponent as SweetLogo } from "../../assets/sweetyLogo.svg";
import {
  addUserData,
  deleteImage,
  getImageDownloadURL,
} from "../../utils/firebase";
import { CorrectText, GreetingText, WarnText } from "./SignUpIDPW";
import { isTallValid } from "../../utils/registerFunction";
import styled, { DefaultTheme } from "styled-components";
import { UploadImage } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import SignUpStepper from "./SignUpStepper";
import { useRecoilState } from "recoil";
import { Container } from "./StartPage";
import { useEffect, useState } from "react";
import {
  idState,
  pwState,
  jobState,
  tallState,
  mbtiState,
  alcoholState,
  smokingState,
  userNameState,
  birthdayState,
  profileImageState,
  selectedGenderState,
  selectedRegionState,
  activeStepState,
} from "../../recoil/atoms";
import {
  SelectBox,
  OptionBox,
  TwoColumnWrapper,
  RootErrorMessageWrapper,
  RootErrorMessage,
  GobackLink,
  NameInput,
  DefaultOption,
} from "./SignUpSpecific";
import {
  SignUpButtonProps,
  alcoholOptions,
  compatibilityMessages,
  jobOptions,
  mbtiTypes,
  smokingOptions,
} from "../../constants/constant";
import axios from "axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { InputWrapper } from "./Login";
import Spinner from "../common/Spinner";

interface SignUpSpecificProps {
  theme: DefaultTheme;
}

function SignUpSpecific({ theme }: SignUpSpecificProps) {
  const [id] = useRecoilState(idState);
  const [pw] = useRecoilState(pwState);
  const [userName] = useRecoilState(userNameState);
  const [birthday] = useRecoilState(birthdayState);
  const [profileImage] = useRecoilState(profileImageState);
  const [selectedGender] = useRecoilState(selectedGenderState);
  const [selectedRegion] = useRecoilState(selectedRegionState);
  const [job, setJob] = useRecoilState(jobState);
  const [tall, setTall] = useRecoilState(tallState);
  const [mbti, setMbti] = useRecoilState(mbtiState);
  const [alcohol, setAlcohol] = useRecoilState(alcoholState);
  const [smoking, setSmoking] = useRecoilState(smokingState);
  const [activeStep, setActiveStep] = useRecoilState(activeStepState);
  const [isSignUp, setIsSignUp] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  const handleSignUpClick = async (
    id: string,
    password: string,
    name: string,
    picture: string,
  ): Promise<void> => {
    try {
      const response = await axios.post(
        "https://fastcampus-chat.net/signup",
        {
          id,
          password,
          name,
          picture,
        },
        {
          headers: {
            "Content-Type": "application/json",
            serverId: process.env.REACT_APP_SERVER_ID,
          },
        },
      );
      if (response.status === 200 && response.data.message === "User created") {
        try {
          setIsSignUp(true);
          setProgress(40);
          const imageUrl = await getImageDownloadURL(id);
          await UploadImage({ imageName: id, file: profileImage as File });
          setProgress(70);
          const userData = {
            userId: id,
            password: pw,
            token: "",
            nickName: userName,
            birth: birthday,
            gender: selectedGender,
            region: selectedRegion,
            profileUrl: imageUrl,
            myChats: [],
            introduction: "",
            interested: [],
            status: "A",
            alcohol: alcohol,
            smoking: smoking,
            mbti: mbti,
            job: job,
            tall: tall,
          };
          await addUserData(userData);
          setProgress(100);
          navigate("/login");
          console.log("가입에 성공했습니다.");
        } catch (error) {
          await deleteImage(id);
          console.error("유저 데이터 업로드를 실패했습니다 : ", error);
        }
      } else {
        await deleteImage(id);
        console.error("회원가입에 실패했습니다 :", response.data.message);
        window.alert(
          "서버와의 연결이 불안정 합니다. 잠시후 다시 시도해 주세요.",
        );
      }
    } catch (error) {
      console.error("회원가입 중 서버와의 에러가 발생했습니다 :", error);
      window.alert(
        "서버와의 연결이 불안정 합니다.\n잠시후 다시 시도해 주세요.",
      );
    }
  };

  const handleSignUpClickWrapper = async () => {
    if (profileImage) {
      try {
        await UploadImage({ imageName: id, file: profileImage as File });
        setProgress(20);
        const imageUrl = await getImageDownloadURL(id);
        await handleSignUpClick(id, pw, userName, imageUrl);
      } catch (error) {
        console.error("유저 데이터 업로드 실패", error);
        await deleteImage(id);
      }
    } else {
      console.error("프로필 이미지가 없습니다");
    }
  };

  useEffect(() => {
    setActiveStep(2);
    console.log(activeStep);
  });

  return !isSignUp ? (
    id &&
    pw &&
    userName &&
    birthday &&
    profileImage &&
    selectedGender &&
    selectedRegion ? (
      <Container gap="26px" marginTop="20px">
        <SignUpStepper />
        <GreetingText>회원가입</GreetingText>

        <InputWrapper margin="5px 0 0 0">
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
        </InputWrapper>
        <InputWrapper>
          <p>MBTI</p>
          <SelectBox defaultValue="" onChange={(e) => setMbti(e.target.value)}>
            <DefaultOption value="" disabled selected hidden>
              MBTI를 선택해주세요
            </DefaultOption>
            {mbtiTypes.map((mbti) => (
              <OptionBox key={mbti.value} value={mbti.value}>
                {mbti.label}
              </OptionBox>
            ))}
          </SelectBox>
          {mbti ? (
            <CorrectText>{compatibilityMessages[mbti]}</CorrectText>
          ) : null}
        </InputWrapper>
        <div>
          <p>직업</p>
          <SelectBox defaultValue="" onChange={(e) => setJob(e.target.value)}>
            <DefaultOption value="" disabled selected hidden>
              해당하는 직업을 선택해주세요
            </DefaultOption>
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
              width="150px"
              defaultValue=""
              onChange={(e) => setAlcohol(e.target.value)}
            >
              <DefaultOption value="" disabled selected hidden>
                음주는 하시나요?
              </DefaultOption>
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
              width="150px"
              defaultValue=""
              onChange={(e) => setSmoking(e.target.value === "true")}
            >
              <DefaultOption value="" disabled selected hidden>
                흡연은 하시나요?
              </DefaultOption>
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
        {progress === 0 ? (
          <SignUpButton
            job={job}
            isTallValid={isTallValid(tall)}
            mbti={mbti}
            alcohol={alcohol}
            smoking={smoking}
            onClick={handleSignUpClickWrapper}
          >
            달콤한 만남 시작하기!
          </SignUpButton>
        ) : (
          <Spinner />
        )}
        <Box sx={{ width: "100%", position: "absolute", bottom: 0 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </Container>
    ) : (
      <RootErrorMessageWrapper>
        <SweetLogo />
        <RootErrorMessage>
          올바른 경로로 회원가입을 진행해주세요🥲
        </RootErrorMessage>
        <GobackLink onClick={() => navigate("/")}>
          회원가입으로 돌아가기
        </GobackLink>
      </RootErrorMessageWrapper>
    )
  ) : (
    <Container gap="30px">
      <SweetLogo />
      <LoadingText fontSize="64px">환영합니다🎉</LoadingText>
      <LoadingText fontSize="20px">
        회원가입이 완료되어 로그인 페이지로 이동중...
      </LoadingText>
      <Box sx={{ width: "100%", position: "absolute", bottom: 0 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </Container>
  );
}

const SignUpButton = styled.button<SignUpButtonProps>`
  font-size: 20px;
  width: 340px;
  height: 50px;
  color: white;
  border: none;
  border-radius: 12px;
  background: ${({ job, isTallValid, mbti, alcohol, smoking }) =>
    job && isTallValid && mbti && alcohol && smoking != undefined
      ? (props) => props.theme.color.primary
      : (props) => props.theme.color.darkGray};
  cursor: ${({ job, isTallValid, mbti, alcohol, smoking }) =>
    job && isTallValid && mbti && alcohol && smoking != undefined
      ? "pointer"
      : "default"};
`;

const LoadingText = styled.div<{ fontSize: string }>`
  font-size: ${(props) => props.fontSize || "16px"};
`;

export default SignUpSpecific;
