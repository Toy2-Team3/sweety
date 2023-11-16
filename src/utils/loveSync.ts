import { mbtiScore } from "../constants/constant";

export const calculateLoveSync = (
  mbti: string,
  interested: string[],
  smoking: boolean,
  alcohol: string,
  age: string,
  myMbti: string,
  myInterested: string[],
  mySmoking: boolean,
  myAlcohol: string,
  myAge: string,
) => {
  const mbtiPoints = {
    천생연분: 0,
    좋은관계: 0,
    보통: 0,
    안맞아요: 0,
  };

  // MBTI 점수 계산
  mbtiPoints.천생연분 = mbtiScore[myMbti].천생연분.includes(mbti) ? 30 : 0;
  mbtiPoints.좋은관계 = mbtiScore[myMbti].좋은관계.includes(mbti) ? 20 : 0;
  mbtiPoints.보통 = mbtiScore[myMbti].보통.includes(mbti) ? 10 : 0;
  mbtiPoints.안맞아요 = mbtiScore[myMbti].안맞아요.includes(mbti) ? 0 : 0;

  // 관심사 점수 계산
  const commonInterests = interested.filter((interest) =>
    myInterested.includes(interest),
  );

  const commonInterestsCount = commonInterests.length;

  const interestScore = commonInterestsCount * 5;

  // 흡연 점수 계산
  const smokingScore = smoking === mySmoking ? 15 : 0;

  // 음주 점수 계산
  const alcoholScore = alcohol === myAlcohol ? 15 : 0;

  // 나이차 점수 계산
  const ageDifferenceScore = age <= myAge + 4 ? 15 : 0;

  // 총 궁합도 계산
  const totalScore =
    mbtiPoints.천생연분 +
    mbtiPoints.좋은관계 +
    mbtiPoints.보통 +
    mbtiPoints.안맞아요 +
    interestScore +
    smokingScore +
    alcoholScore +
    ageDifferenceScore;

  return totalScore;
};
