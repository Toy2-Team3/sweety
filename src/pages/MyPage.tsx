import styled from "styled-components";
import { useEffect, useState } from "react";
import ByeModal from "../components/myPage/ByeModal";
import OptionalInformation from "../components/myPage/OptionalInformation";
import RequiredInformation from "../components/myPage/RequiredInformation";
import theme from "../styles/theme";
import { useRecoilValue } from "recoil";
import { idState, profileImageUrlState, userNameState, introductionState, interestedTagsState, selectedRegionState, tallState, mbtiState, jobState, alcoholState, smokingState } from "../recoil/atoms";
import { getUserData } from "../utils/firebase";
import { UserData } from "../constants/constant";

type MypageUserData = Omit<UserData, "password" | "token" | "myChats" | "status">;

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const id = useRecoilValue(idState); 
  const profileUrl = useRecoilValue(profileImageUrlState);
  const nickName = useRecoilValue(userNameState);
  const region = useRecoilValue(selectedRegionState);
  const tall = useRecoilValue(tallState);
  const mbti = useRecoilValue(mbtiState);
  const job = useRecoilValue(jobState);
  const alcohol = useRecoilValue(alcoholState);
  const smoking = useRecoilValue(smokingState);
  const introduction = useRecoilValue(introductionState);
  const interestedTags = useRecoilValue(interestedTagsState);
  const [userData, setUserData] = useState<MypageUserData | undefined>();
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const getUserInformation = async (id: string): Promise<void> => {  
      if(!id)
        return;

      const fetchedData = await getUserData(id);

      if(fetchedData) {
        const userData: MypageUserData = {
          job: fetchedData.job,
          tall: fetchedData.tall,
          mbti: fetchedData.mbti,
          alcohol: fetchedData.alcohol,
          smoking: fetchedData.smoking,
          region: fetchedData.region,
          profileUrl: fetchedData.profileUrl,
          nickName: fetchedData.nickName,
          birth: fetchedData.birth,
          gender: fetchedData.gender,
          introduction: fetchedData.introduction,
          interested: fetchedData.interested,
          userId: fetchedData.userId,
        };
        setUserData(userData);
        // console.log(userData);
      }
    }

    getUserInformation(id);
  }, [id])

  const checkIsChanged = (profileUrl: string, 
                          nickName: string, 
                          region: string, 
                          tall: string, 
                          mbti: string, 
                          job: string, 
                          alcohol: string, 
                          smoking: boolean, 
                          introduction: string, 
                          interestedTags: string[]) => {
    if(userData) {
      if(userData.profileUrl !== profileUrl
        || userData.nickName !== nickName 
        || userData.region !== region
        || String(userData.tall) !== tall
        || userData.mbti !== mbti
        || userData.job !== job
        || userData.alcohol !== alcohol
        || userData.smoking !== smoking
        || userData.introduction !== introduction
        || `${userData.interested}` !== `${interestedTags}`) {
          console.log(`바뀜`);
          console.log(isChanged);
          setIsChanged(true);
      } else {
        setIsChanged(false);
      }
    }
  }

  useEffect(() => {
    checkIsChanged(profileUrl, nickName, region, tall, mbti, job, alcohol, smoking, introduction, interestedTags);
  }, [profileUrl, nickName, region, tall, mbti, job, alcohol, smoking, introduction, interestedTags]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleScrolling = () => {
    setAtBottom(window.scrollY > 100 ? true : false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrolling);

    return () => {
      window.removeEventListener("scroll", handleScrolling);
    };
  }, []);

  // TODO : 
  // default 정보: 파이어베이스에서 가져온 회원 정보 => O
  // 하나의 값이라도 수정한다면 버튼 색 바뀌도록 => O
  // 프로필 수정 버튼 클릭 시 변경된 정보 파이어베이스 및 서버로 전송
  
  

  return (
    <PageWrap>
      <SaveButtonWrap>
        {
          !atBottom && 
            <SaveButton $isChanged={isChanged}>
              프로필 수정
            </SaveButton>
        }
      </SaveButtonWrap>
      <InformationWrap>
        <RequiredInformation theme={theme}/>
        <OptionalInformation />
      </InformationWrap>
      {
        atBottom && 
          <SaveButton
            $isChanged={isChanged}
            style={{marginTop: '-5.5rem', marginBottom: '5rem'}}
          >
            프로필 수정
          </SaveButton>
      }
      <ByeButtonWrap>
        <ByeButton onClick={handleOpenModal}>
          회원 탈퇴
        </ByeButton>
        {
          isModalOpen && 
          <ByeModal 
            isOpen={isModalOpen} 
            closeModal={handleCloseModal} 
            />
        }
      </ByeButtonWrap>
    </PageWrap>
  )
}

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SaveButtonWrap = styled.div`
  position: absolute;
  top: 2rem;
  right: 2.5rem;
`;

const SaveButton = styled.button<{ $isChanged: boolean }>`
  width: 180px;
  height: 50px;
  color: white;
  background: ${(props) =>
    props.$isChanged ? 
      props.theme.color.primary : 
      props.theme.color.darkGray
    }; 
  cursor: ${(props) =>
    props.$isChanged ? 
      "pointer" :
      "default"
    }; 
  border: none;
  border-radius: 12px;
`;

const InformationWrap = styled.div`
  max-width: 342px;
  margin: 8rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const ByeButtonWrap = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
`;

const ByeButton = styled.button`
  color: ${props => props.theme.color.borderGray};
  border: none;
  border-radius: 12px;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`;