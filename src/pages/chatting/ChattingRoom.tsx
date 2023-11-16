import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChattingRoomProps } from "../../types/chatting";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

const ChattingRoom = ({
  onClick,
  data,
  isCurrentRoom,
}: {
  onClick: () => void;
  data: ChattingRoomProps | undefined;
  isCurrentRoom: boolean;
}) => {
  const [latestMessageTime, setLatestMessageTime] = useState<
    string | undefined
  >("");
  dayjs.extend(relativeTime);
  dayjs.locale("ko");
  const now = dayjs();

  useEffect(() => {
    if (data && data.latestMessage) {
      const duration = now.diff(data?.latestMessage.createdAt, "minute");
      if (duration > 1440) {
        setLatestMessageTime(`${Math.floor(duration / 1440)}일전`);
      } else if (duration > 60) {
        setLatestMessageTime(`${Math.floor(duration / 60)}시간전`);
      } else if (duration > 0) {
        setLatestMessageTime(`${duration}분전`);
      } else {
        setLatestMessageTime(`1분전`);
      }
    }
  }, []);

  return data === undefined ? (
    <NoChattingRoom>현재 참여중인 채팅방이 없어요</NoChattingRoom>
  ) : (
    <ChattingRoomWrapper onClick={onClick} $isCurrentRoom={isCurrentRoom}>
      <ChattingRoomName>{data?.name}</ChattingRoomName>
      <ChattingRoomStatus>
        <span>{data.latestMessage ? data.latestMessage?.text : "아직 메세지가 없습니다" }</span>
        <span>{latestMessageTime}</span>
      </ChattingRoomStatus>
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
  margin-bottom: 7px;
  padding-right: 4px;
`;

const ChattingRoomStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  font-size: 14px;
  font-weight: 400;
  color: "#626262";
  padding-right: 4px;

  > span:first-child {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
  }

  > span:nth-child(2) {
    color: grey;
    flex-shrink: 0;
  }
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
