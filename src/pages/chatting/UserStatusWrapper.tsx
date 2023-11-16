import styled from "styled-components";

interface UserInfo {
  image: string;
  name: string;
  isOnline: boolean;
}

const UserStatusWrapper = (item: UserInfo) => {
  return (
    <Wrapper>
      <UserInfo>
        <img src={item.image} alt="" />
        <span>{item.name}</span>
      </UserInfo>
      <OnlineStatus>
        <StatusDot $status={item.isOnline} />
        {item.isOnline ? "온라인" : "오프라인"}
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

const StatusDot = styled.div<{ $status: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.$status ? "#039F00" : "#9A9A9A")};
`;
