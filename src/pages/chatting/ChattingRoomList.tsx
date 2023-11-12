import styled from "styled-components";
import ChattingRoom from "./ChattingRoom";

export interface ChattingRoomProps {
  name: string;
  online: boolean;
  roomId: number;
}

const ChattingRoomList = ({
  roomData,
  currentRoomNumber,
  setCurrentRoomNumber,
  setShowRoomList,
}: {
  roomData: ChattingRoomProps[];
  currentRoomNumber: number;
  setCurrentRoomNumber: React.Dispatch<React.SetStateAction<number>>;
  setShowRoomList?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <MainContainer>
      <PaddingBox />
      {/* 인덱스 추가하기 */}
      {roomData.map((item, index) => {
        const isCurrentRoom = index === currentRoomNumber;
        return (
          <ChattingRoom
            onClick={() => {
              setCurrentRoomNumber(index);
              if (setShowRoomList) {
                setShowRoomList(false);
              }
            }}
            key={index}
            data={item}
            isCurrentRoom={isCurrentRoom}
          />
        );
      })}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 264px;
  border-right: 1px solid #9b9b9b;
  overflow-y: scroll;
  overflow-x: hidden;
  flex-shrink: 0;
  background-color: white;
  height: 100vh;

  @media screen and (max-width: 1024px) {
    position: absolute;
    z-index: 2;
  }
`;

const PaddingBox = styled.div`
  height: 30px;
  border-bottom: 1px solid #c9c9c9;
`;

export default ChattingRoomList;
