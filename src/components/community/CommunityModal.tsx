import { FC, useEffect } from "react";
import styled from "styled-components";
import Close from "../../assets/close.png";
import Chat from "../../assets/comments-solid.svg";
import { useRecoilState } from "recoil";
import { commonListState } from "../../recoil/atoms";
import { useNavigate } from "react-router-dom";
import { deleteData } from "../../utils/firebase";
import AlertDialogModal from "./DeleteModal";
import Button from "@mui/joy/Button";
import axios from "axios";
import { preventScroll } from "../../utils/preventScroll";
import UserCard from "./UserCard";
import { CommonData } from "../../constants/constant";

interface User {
  id: string;
  name: string;
  picture: string;
}

interface Response {
  id: string;
  name: string;
  users: User[];
  isPrivate: boolean;
  updatedAt: Date;
  message?: string;
}

interface RequestBody {
  chatId: string;
}

interface CommunityModalProps {
  item: CommonData;
  isPostModalOpen: boolean;
  handleClosePostModal: () => void;
  setShowToastMsg: (value: boolean) => void;
  setToastMsg: (content: string) => void;
}

const CommunityModal: FC<CommunityModalProps> = ({
  item,
  isPostModalOpen,
  handleClosePostModal,
  setShowToastMsg,
  setToastMsg,
}) => {
  const ID = sessionStorage.getItem("id");
  const ACCESS_TOKEN = sessionStorage.getItem("accessToken");
  const [commonList, setCommonList] = useRecoilState(commonListState);
  const navigate = useNavigate();

  //그룹 채팅 참여 버튼 클릭
  const handleClickChatButton = async () => {
    try {
      const requestBody: RequestBody = {
        chatId: item.chatId as string,
      };

      const response = await axios.patch<Response>(
        "https://fastcampus-chat.net/chat/participate",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            serverId: process.env.REACT_APP_SERVER_ID,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        },
      );

      if (response.status === 200) {
        handleClosePostModal();
        navigate(`/chat?chatId=${item.chatId}`);
      } else {
        console.log("그룹 채팅 참여하기 실패", response);
      }
    } catch (error) {
      console.log(error);
      setToastMsg("이미 참여한 채팅입니다! 채팅방으로 이동합니다 ✈️");
      setShowToastMsg(true);

      setTimeout(() => {
        setShowToastMsg(false);
        handleClosePostModal();
        navigate(`/chat?chatId=${item.chatId}`);
      }, 2000);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteData("community", id);

      // 삭제 완료 글 리스트 새로고침하기
      const newList = commonList.filter((item) => {
        return item.id !== ID;
      });
      setCommonList(newList);

      handleClosePostModal();
      setToastMsg("성공적으로 삭제하였습니다!");
      setShowToastMsg(true);
    } catch (error) {
      handleClosePostModal();

      setToastMsg("삭제되지 못했습니다.. 다시 시도해주세요!");
      setShowToastMsg(true);
    } finally {
      setTimeout(() => {
        setShowToastMsg(false);
      }, 2000);
    }
  };

  const handleUpdate = () => {
    handleClosePostModal();
    navigate(`/community/update/${item.id}`);
  };

  useEffect(() => {
    preventScroll(isPostModalOpen);
  }, [isPostModalOpen]);

  return (
    <ModalBackground onClick={handleClosePostModal}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClosePostModal}>
          <img src={Close} />
        </CloseButton>
        <ModalContent>
          {ID !== item.userId && (
            <ModalLeft>
              <UserCard item={item} />
            </ModalLeft>
          )}
          <ModalRight>
            <h1>{item.title}</h1>
            <p>{item.content}</p>
            <div>
              {ID !== item.userId && item.chatId !== "" && (
                <GoToChatButton onClick={handleClickChatButton}>
                  <img src={Chat} />
                  그룹 채팅 참여
                </GoToChatButton>
              )}

              {ID === item.userId && (
                <CommunityButtonWrapper>
                  <AlertDialogModal item={item} handleDelete={handleDelete} />
                  <Button
                    variant="plain"
                    color="primary"
                    size="lg"
                    sx={{ width: 1 / 2 }}
                    onClick={handleUpdate}
                  >
                    수정
                  </Button>
                </CommunityButtonWrapper>
              )}
            </div>
          </ModalRight>
        </ModalContent>
      </ModalWrapper>
    </ModalBackground>
  );
};

export default CommunityModal;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
`;

const ModalWrapper = styled.div`
  width: 60%;
  max-height: 80%;
  padding: 3rem;
  overflow-y: auto; //모달 height에 따라 스크롤바 나타남

  background-color: white;
  border: transparent;
  border-radius: 1rem;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${(props) => props.theme.response.tablet} {
    min-width: 70%;
    max-height: 80%;
    padding: 2rem;
  }

  ${(props) => props.theme.response.mobile} {
    min-width: 80%;
    max-height: 80%;
    padding: 2rem;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;

  img {
    width: 1.5rem;
    height: 1.5rem;

    ${(props) => props.theme.response.tablet} {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2rem;

  ${(props) => props.theme.response.tablet} {
    flex-direction: column;
  }
`;

const ModalLeft = styled.div`
  ${(props) => props.theme.response.tablet} {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const ModalRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${(props) => props.theme.response.tablet} {
    width: 100%;
  }
  h1 {
    font-size: 2rem;
    font-weight: bold;
    line-height: 2.5rem;

    ${(props) => props.theme.response.tablet} {
      font-size: 1.6rem;
      line-height: 1.5rem;
    }

    ${(props) => props.theme.response.mobile} {
      font-size: 1.3rem;
    }
  }

  p {
    font-size: 1.1rem;
    font-weight: normal;
    line-height: 1.5rem;

    ${(props) => props.theme.response.mobile} {
      font-size: 1rem;
    }
  }
`;

const GoToChatButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;

  white-space: nowrap;
  color: ${(props) => props.theme.color.primary};
  font-size: 1.1rem;

  background: rgba(217, 78, 40, 0.1);
  border: transparent;
  border-radius: 0.5rem;

  padding: 0.6rem 1rem;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
  }

  ${(props) => props.theme.response.mobile} {
    font-size: 1rem;
  }
`;

const CommunityButtonWrapper = styled.div`
  width: 50%;

  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 1rem;

  ${(props) => props.theme.response.mobile} {
    width: 100%;
  }
`;
