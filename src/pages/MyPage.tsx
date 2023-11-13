import styled from "styled-components";
import { useEffect, useState } from "react";
import ByeModal from "../components/myPage/ByeModal";
import OptionalInformation from "../components/myPage/OptionalInformation";
import RequiredInformation from "../components/myPage/RequiredInformation";
import theme from "../styles/theme";

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

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
  // default 정보: 파이어베이스에서 가져온 회원 정보 
  // 하나의 값이라도 수정한다면 버튼 색 바뀌도록
  // 프로필 수정 버튼 클릭 시 변경된 정보 파이어베이스 및 서버로 전송
  

  return (
    <PageWrap>
      <SaveButtonWrap>
        {
          !atBottom && 
            <SaveButton>
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

const SaveButton = styled.button`
  width: 180px;
  height: 50px;
  color: white;
  background: ${props => props.theme.color.darkGray};
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