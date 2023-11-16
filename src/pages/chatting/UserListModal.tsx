import styled from "styled-components";
import xIcon from "../../assets/xIcon.svg";
import ex from "../../assets/ex.jpg";
import UserStatusWrapper from "./UserStatusWrapper";

const UserListModal = ({
  setShowUserListModal,
}: {
  setShowUserListModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleModalOff = () => {
    setShowUserListModal(false);
  };

  const dummyUserList = [
    { image: ex, name: "윤석민", isOnline: true },
    { image: ex, name: "윤석민", isOnline: true },
    { image: ex, name: "윤석민", isOnline: true },
    { image: ex, name: "윤석민", isOnline: false },
    { image: ex, name: "윤석민", isOnline: false },
    { image: ex, name: "윤석민", isOnline: false },
    { image: ex, name: "윤석민", isOnline: false },
    { image: ex, name: "윤석민", isOnline: false },
    { image: ex, name: "윤석민", isOnline: false },
  ];

  return (
    <>
      <ModalBackground onClick={handleModalOff} />
      <Container>
        <div>
          <h1>대화 상대 ({dummyUserList.length}명)</h1>
          <img
            src={xIcon}
            alt=""
            title="대화 상대 창 끄기"
            onClick={handleModalOff}
          />
        </div>
        <div>
          {dummyUserList.map((item, index) => {
            return <UserStatusWrapper key={index} {...item} />;
          })}
        </div>
      </Container>
    </>
  );
};

export default UserListModal;

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 400px;
  min-height: 400px;
  max-height: 800px;
  overflow: scroll;
  border: 1px solid #f9744c;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;

  > div:first-child {
    border-bottom: 1px solid grey;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      cursor: pointer;
    }
  }

  h1 {
    text-align: center;
    font-size: 20px;
    font-weight: 800;
  }
`;
