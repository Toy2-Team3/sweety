import React from "react";
import styled from "styled-components";

interface ChattingRoomProps {
  name: string;
  online: boolean;
  roomId: number;
}

const ChattingRoom = ({
  onClick,
  data,
  isCurrentRoom,
}: {
  onClick: () => void;
  data: ChattingRoomProps;
  isCurrentRoom: boolean;
}) => {
  const StatusCircle = () => {
    return (
      <Circle
        style={{ backgroundColor: data.online ? "#039f00" : "#9a9a9a" }}
      />
    );
  };

  return (
    <ChattingRoomWrapper onClick={onClick} $isCurrentRoom={isCurrentRoom}>
      <ChattingRoomName>{data.name}</ChattingRoomName>
      <ChattingRoomStatus>
        <StatusCircle />
        {data.online ? "Online" : "Offline"}
      </ChattingRoomStatus>
    </ChattingRoomWrapper>
  );
};

const ChattingRoomWrapper = styled.div<{ $isCurrentRoom: boolean }>`
  min-width: 264px;
  padding: 12px 0 11px 25px;
  border-bottom: 1px solid #c9c9c9;
  cursor: ${(props) => (props.$isCurrentRoom ? "default" : "pointer")};
  background-color: ${(props) =>
    props.$isCurrentRoom ? "rgba(249, 116, 76, 0.24)" : "#fff"};
`;

const ChattingRoomName = styled.h1`
  font-size: 20px;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
  margin-bottom: 5px;
`;

const ChattingRoomStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 400;
  color: "#626262";
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

export default ChattingRoom;
