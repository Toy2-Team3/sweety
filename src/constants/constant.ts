export const regions = [
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

export const genderOptions = [
  { value: "male", label: "남성" },
  { value: "female", label: "여성" },
  // 더 많은 성별 옵션을 추가할 수 있습니다.
];

export const mbtiTypes = [
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

export const jobOptions = [
  { value: "무직", label: "무직" },
  { value: "학생", label: "학생" },
  { value: "회사원", label: "회사원" },
  { value: "자영업", label: "자영업" },
  { value: "전문직", label: "전문직" },
  { value: "공무원", label: "공무원" },
  { value: "기타", label: "기타" },
];

export const alcholOptions = [
  { value: "N", label: "안 마셔요" },
  { value: "S", label: "가끔 마셔요" },
  { value: "O", label: "자주 마셔요" },
];

export const smokingOptions = [
  { value: false, label: "안 해요" },
  { value: true, label: "해요" },
];

export const compatibilityMessages: { [key: string]: string } = {
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

export interface ButtonProps {
  profileImage: File | undefined;
  userName: string;
  birthday: string | null;
  selectedGender: string;
  selectedRegion: string;
  isNameValid: boolean;
}

export interface NextButtonProps {
  isInputValid: boolean;
  isIdentificationValid: boolean;
  pw: string;
  pwCheck: string;
  isIdDuplicated: boolean;
}

export interface SignUpButtonProps {
  job: string;
  isTallValid: boolean;
  mbti: string;
  alchol: string;
  smoking: boolean;
}
