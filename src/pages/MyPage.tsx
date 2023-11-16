import styled from "styled-components";
import { useEffect, useState } from "react";
import ByeModal from "../components/myPage/ByeModal";
import OptionalInformation from "../components/myPage/OptionalInformation";
import RequiredInformation from "../components/myPage/RequiredInformation";
import theme from "../styles/theme";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { profileImageUrlState, userNameState, introductionState, interestedTagsState, selectedRegionState, tallState, mbtiState, jobState, alcoholState, smokingState, profileImageState, loginState } from "../recoil/atoms";
import { UploadImage, getImageDownloadURL, getUserData, updateUserData } from "../utils/firebase";
import { UserData } from "../constants/constant";
import ToastMessage from "../components/common/ToastMessage";
import axios from "axios";
import { logOut } from "../utils/logOut";
import { useNavigate } from "react-router-dom";

export type MypageUserData = Partial<UserData>;

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const id = sessionStorage.getItem('id');
  const [profileImage, setProfileImage] = useRecoilState(profileImageState);
  const setProfileImageUrl = useSetRecoilState(profileImageUrlState); 
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
  const token = sessionStorage.getItem("accessToken");
  const tempImage = sessionStorage.getItem("tempImage");
  const setLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();
  
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

  const updateMyPageData = async () => {
    if(!isChanged)
      return;

    try {

      if(id) {
        // 이미지 업로드
        if(isImageChanged) {
          UploadImage({ imageName: id, file: profileImage as File });
          setProfileImage(profileImage);
        }
     
        const imageUrl = await getImageDownloadURL(id); 
        setProfileImageUrl(imageUrl);


        // 서버로 전송
        const response = await axios.patch(
          "https://fastcampus-chat.net/user",
          {
            name: userName,
            picture: imageUrl
          },
          {
            headers: {
              "content-type": "application/json",
              serverId: process.env.REACT_APP_SERVER_ID,
              Authorization: `Bearer ${token}`,
            },
           },
        );
  
        // 서버 응답이 200이면 파이어베이스에 업데이트
        if(response.status === 200) {
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

          await updateUserData(id, changedUserData);
          console.log(`${id}의 정보가 수정되었습니다.`);
  
          setIsChanged(false);
          setShowToast(true);
  
          setTimeout(() => {
            setShowToast(false);
            window.location.reload();
            setIsImageChanged(false);
          }, 2000);
        }
        else {
          // 응답이 200이 아닐 경우 이전의 프로필 이미지로 되돌리기
          const file = new Blob([tempImage!], { type: "File" });
          UploadImage({ imageName: id, file: file as File });
          const imageUrl = await getImageDownloadURL(id); 
          setProfileImage(profileImage);
          setProfileImageUrl(imageUrl);
          await updateUserData(id, {profileUrl: imageUrl});
          console.log('프로필 수정을 실패했습니다');

          return;
        }
      }
    } catch (error) {
      console.log(`[ERROR]: ${error}`)
    }
  };

  return (
    <PageWrap>
      <SaveButtonWrap>
        {
          !atBottom && 
            <SaveButton 
              $isChanged={isChanged} 
              onClick={updateMyPageData}
            >
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
          <BottomSaveButton
            $isChanged={isChanged}
            onClick={updateMyPageData}
          >
            프로필 수정
          </BottomSaveButton>
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
      <LogOutButton onClick={() => logOut(setLogin, navigate)}>로그아웃</LogOutButton>
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

  ${(props) => props.theme.response.mobile} {
    display: none;
  }
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

const BottomSaveButton = styled(SaveButton)`
  margin-top: -5.5rem;
  margin-bottom: 5rem;
`;

const InformationWrap = styled.div`
  max-width: 342px;
  margin: 8rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  ${(props) => props.theme.response.mobile} {
    margin-top: 3.5rem;
  }
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

const LogOutButton = styled.button`
  display: none;

  ${(props) => props.theme.response.mobile} {
    display: block;
    background: ${props => props.theme.color.lightGray};
    color: ${props => props.theme.color.borderGray};
    border: none;
    border-radius: 12px;
    padding: 10px;
    margin-bottom: 1.5rem;

    &:hover {
      cursor: pointer;
    }
  }
`;