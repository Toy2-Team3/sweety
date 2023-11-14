import React from "react";
import styled from "styled-components";
import { ChattingRoomProps } from "../../types/chatting";

const ChattingRoom = ({
  onClick,
  data,
  isCurrentRoom,
}: {
  onClick: () => void;
  data: ChattingRoomProps | undefined;
  isCurrentRoom: boolean;
}) => {
  return data === undefined ? (
    <NoChattingRoom>현재 참여중인 채팅방이 없어요</NoChattingRoom>
  ) : (
    <ChattingRoomWrapper onClick={onClick} $isCurrentRoom={isCurrentRoom}>
      <ChattingRoomName>{data?.name}</ChattingRoomName>
      <ChattingRoomStatus></ChattingRoomStatus>
    </ChattingRoomWrapper>
  );
};

const ChattingRoomWrapper = styled.div<{ $isCurrentRoom: boolean }>`
  min-height: 63px;
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

const NoChattingRoom = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ChattingRoom;
