import { ReactComponent as SweetLogo } from "../../assets/sweetyLogo.svg";
import { SelectBox, OptionBox, TwoColumnWrapper } from "./SignUpSpecific";
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

const compatibilityMessages: { [key: string]: string } = {
  ISTJ: "ESFP, ESTP와 가장 안정적인 궁합을 이룬대요!",
  ISFJ: "ESFP, ESTP와는 서로를 보완해주는 짝이 된대요!",
  ISTP: "ESFJ, ESTJ와 꽤나 잘어울리는 짝이 될 수 있을 거 같아요!",
  ISFP: "ESFJ, ESTJ, ESTP와 오래가는 커플이 될 수 있어요!",
  INFJ: "그거 아셨나요? ENFP, ENTP와 환상의 궁합이래요!",
  INFP: "그거 아세요? ENTJ, ENFJ와 궁합이 가장 좋대요!",
  INTJ: "ENTJ와는 비전과 목표를 공유해 궁합이 좋아요!",
  INTP: "그거 아세요? ENTJ, ESTJ와 궁합이 가장 좋습니다!",
  ESTJ: "저기...사랑이 뭔지 아시나요?",
  ESFJ: "그거 아세요? ISFP, ISTP와 궁합이 정말 좋대요!",
  ESTP: "ISFJ, ISTJ와는 실용주의적 성향이 잘 맞는다고 하네요!",
  ESFP: "ISFJ, ISTJ와 함꼐라면 항상 즐거울 겁니다!",
  ENFJ: "그거 아세요? ISFP,INFP와 특히 잘 어울린대요!",
  ENTJ: "INTJ, INTP와는 비슷한 가치관을 가져서 궁합이 좋대요!",
  ENFP: "INFJ, INTJ와는 창의적인 아이디어가 넘치는 커플이래요!",
  ENTP: "그거 아세요? INTJ, INTP와 최고의 궁합이래요!",
};

interface ButtonProps {
  job: string;
  isTallValid: boolean;
  mbti: string;
  alchol: string;
  smoking: boolean;
}

interface SignUpSpecificProps {
  theme: DefaultTheme;
}

const isTallValid = (tall: string) => {
  const heightRegex = /^[0-9]+$/;
  const heightNumber = parseInt(tall, 10);

  return heightRegex.test(tall) && heightNumber >= 100 && heightNumber <= 250;
};

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
        달콤한 만남으로 떠나기!
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

const SignUpButton = styled.button<ButtonProps>`
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
