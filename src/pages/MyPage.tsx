import styled from "styled-components";
import { useEffect, useState } from "react";
import ByeModal from "../components/myPage/ByeModal";
import OptionalInformation from "../components/myPage/OptionalInformation";
import RequiredInformation from "../components/myPage/RequiredInformation";
import theme from "../styles/theme";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileImageUrlState, userNameState, introductionState, interestedTagsState, selectedRegionState, tallState, mbtiState, jobState, alcoholState, smokingState, profileImageState } from "../recoil/atoms";
import { UploadImage, getImageDownloadURL, getUserData, updateUserData } from "../utils/firebase";
import { UserData } from "../constants/constant";
import ToastMessage from "../components/common/ToastMessage";

export type MypageUserData = Partial<UserData>;

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const id = sessionStorage.getItem('id');
  const [profileImage, setProfileImage] = useRecoilState(profileImageState);
  const [profileImageUrl, setProfileImageUrl] = useRecoilState(profileImageUrlState); 
  const userName = useRecoilValue(userNameState);
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
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const checkIsChanged = (isImageChanged: boolean, 
                          userName: string, 
                          region: string, 
                          tall: string, 
                          mbti: string, 
                          job: string, 
                          alcohol: string, 
                          smoking: boolean, 
                          introduction: string, 
                          interestedTags: string[]) => {
    if(userData) {
      if(isImageChanged
        || userData.nickName !== userName
        || userData.region !== region
        || String(userData.tall) !== tall
        || userData.mbti !== mbti
        || userData.job !== job
        || userData.alcohol !== alcohol
        || userData.smoking !== smoking
        || userData.introduction !== introduction
        || `${userData.interested}` !== `${interestedTags}`) {
          setIsChanged(true);
      } else {
        setIsChanged(false);
      }
    }
    // console.log(isChanged);
  }

  const getUserInformation = async (): Promise<void> => {
    if(id) {
      const fetchedData = await getUserData(id);

      if (fetchedData) {
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
        checkIsChanged(
          isImageChanged,
          userName,
          region,
          tall,
          mbti,
          job,
          alcohol,
          smoking,
          introduction,
          interestedTags
        );
      }
    }
  };

  useEffect(() => {
    getUserInformation();
  }, [id, isImageChanged, userName, region, tall, mbti, job, alcohol, smoking, introduction, interestedTags]);

  const handleImageChange = () => {
    setIsImageChanged(true);
  };

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
  

  const updateToFireStore = async () => {
    if(id) {
      // 이미지 업로드
      if(isImageChanged) {
        UploadImage({ imageName: id, file: profileImage as File });
        setProfileImage(profileImage);
      }
   
      const imageUrl = await getImageDownloadURL(id); 
      setProfileImageUrl(imageUrl);
      
      // 수정한 데이터 업데이트
      const changedUserData: MypageUserData = {
        profileUrl: imageUrl,
        nickName: userName,
        region: region,
        tall: tall,
        mbti: mbti,
        job: job,
        alcohol: alcohol,
        smoking: smoking,
        introduction: introduction,
        interested: interestedTags,
      };

      // 파이어베이스에 업데이트
      await updateUserData(id, changedUserData);
      console.log(`${id}의 정보가 수정되었습니다.`);
    }
  }

  const updateMyPageData = async () => {
    if(!isChanged)
      return;

    try {
      await updateToFireStore();

      setIsChanged(false);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        window.location.reload();
        setIsImageChanged(false);
      }, 2000);

    } catch (error) {
      console.log(`[ERROR]: ${error}`)
    }
  };

    // TODO : 
    // default 정보: 파이어베이스에서 가져온 회원 정보 => O
    // 하나의 값이라도 수정한다면 버튼 색 바뀌도록 => O
    // 프로필 수정 버튼 클릭 시 변경된 정보 파이어베이스 및 서버로 전송 => 파이어베이스만 O


  return (
    <PageWrap>
      <SaveButtonWrap>
        {
          !atBottom && 
            <SaveButton $isChanged={isChanged} onClick={updateMyPageData}>
              프로필 수정
            </SaveButton>
        }
      </SaveButtonWrap>
      <InformationWrap>
        <RequiredInformation 
          theme={theme}
          onImageChange={handleImageChange}
        />
        <OptionalInformation />
      </InformationWrap>
      {
        atBottom && 
          <SaveButton
            $isChanged={isChanged}
            onClick={updateMyPageData}
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
      {
        showToast &&
          <ToastMessage 
            content="프로필 정보가 수정되었습니다."
          />
      }
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