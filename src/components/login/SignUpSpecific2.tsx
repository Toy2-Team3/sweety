import { ReactComponent as SweetLogo } from "../../assets/sweetyLogo.svg";
import { CorrectText, GreetingText, WarnText } from "./SignUpIDPW";
import styled, { DefaultTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Container } from "./StartPage";
import {
  idState,
  pwState,
  jobState,
  tallState,
  mbtiState,
  alcholState,
  smokingState,
  userNameState,
  birthdayState,
  profileImageState,
  selectedGenderState,
  selectedRegionState,
} from "../../recoil/atoms";
import {
  SelectBox,
  OptionBox,
  TwoColumnWrapper,
  RootErrorMessageWrapper,
  RootErrorMessage,
  GobackLink,
  NameInput,
} from "./SignUpSpecific";
import {
  SignUpButtonProps,
  alcholOptions,
  compatibilityMessages,
  jobOptions,
  mbtiTypes,
  smokingOptions,
} from "../../constants/constant";
import { isTallValid } from "../../utils/registerFunction";

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
  const [alchol, setAlchol] = useRecoilState(alcholState);
  const [smoking, setSmoking] = useRecoilState(smokingState);

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

  return id &&
    pw &&
    userName &&
    birthday &&
    profileImage &&
    selectedGender &&
    selectedRegion ? (
    <Container style={{ gap: "18px" }}>
      <GreetingText>환영합니다🎉</GreetingText>

      <div style={{ position: "relative" }}>
        <p>키</p>
        <NameInput
          placeholder="키를 입력해주세요"
          value={tall}
          onChange={(e) => setTall(e.target.value)}
        />
        {tall ? (
          isTallValid(tall) ? (
            <CorrectText>{tall}cm</CorrectText>
          ) : (
            <WarnText>100~250사이의 숫자만 입력해 주세요</WarnText>
          )
        ) : null}
      </div>
      <div style={{ position: "relative" }}>
        <p>MBTI</p>
        <SelectBox defaultValue="" onChange={(e) => setMbti(e.target.value)}>
          <option
            value=""
            disabled
            selected
            hidden
            style={{ color: theme.color.darkGray }}
          >
            MBTI를 선택해주세요
          </option>
          {mbtiTypes.map((mbti) => (
            <OptionBox key={mbti.value} value={mbti.value}>
              {mbti.label}
            </OptionBox>
          ))}
        </SelectBox>
        {mbti ? <CorrectText>{compatibilityMessages[mbti]}</CorrectText> : null}
      </div>
      <div>
        <p>직업</p>
        <SelectBox defaultValue="" onChange={(e) => setJob(e.target.value)}>
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
            defaultValue=""
            onChange={(e) => setAlchol(e.target.value)}
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
            {alcholOptions.map((alchol) => (
              <OptionBox key={alchol.value} value={alchol.value}>
                {alchol.label}
              </OptionBox>
            ))}
          </SelectBox>
        </div>
        <div>
          <p>흡연</p>
          <SelectBox
            style={{ width: "150px" }}
            defaultValue=""
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
      <SignUpButton
        job={job}
        isTallValid={isTallValid(tall)}
        mbti={mbti}
        alchol={alchol}
        smoking={smoking}
        onClick={() => console.log(job, alchol, smoking)}
      >
        달콤한 만남 시작하기!
      </SignUpButton>
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
  );
}

const SignUpButton = styled.button<SignUpButtonProps>`
  font-size: 20px;
  width: 340px;
  height: 50px;
  color: white;
  border: none;
  border-radius: 12px;
  background: ${({ job, isTallValid, mbti, alchol, smoking }) =>
    job && isTallValid && mbti && alchol && smoking
      ? (props) => props.theme.color.primary
      : (props) => props.theme.color.darkGray};
  cursor: ${({ job, isTallValid, mbti, alchol, smoking }) =>
    job && isTallValid && mbti && alchol && smoking ? "pointer" : "default"};
`;

export default SignUpSpecific;
