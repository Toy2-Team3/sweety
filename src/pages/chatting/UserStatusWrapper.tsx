import styled from "styled-components";

export interface ChatUserInfo {
  id: string;
  username: string;
  picture: string;
}

const UserStatusWrapper = ({
  item,
  isOnline,
}: {
  item: ChatUserInfo;
  isOnline: boolean | undefined;
}) => {
  return (
    <Wrapper>
      <UserInfo>
        <img src={item.picture} alt="" />
        <span>{item.username}</span>
      </UserInfo>
      <OnlineStatus>
        <StatusDot $status={isOnline} />
        {isOnline ? "온라인" : "오프라인"}
      </OnlineStatus>
    </Wrapper>
  );
};

export default UserStatusWrapper;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 63px;
  padding: 0 10px;
  border-bottom: 0.5px solid rgba(217, 217, 217, 1);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 18px;
  font-weight: 500;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const OnlineStatus = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 16px;
`;

const StatusDot = styled.div<{ $status: boolean | undefined }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.$status ? "#039F00" : "#9A9A9A")};
`;
