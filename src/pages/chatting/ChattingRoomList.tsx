import styled from "styled-components";
import ChattingRoom from "./ChattingRoom";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ChattingRoomProps } from "../../types/chatting";

const ChattingRoomList = ({
  myRoomData,
  setShowRoomList,
}: {
  myRoomData: ChattingRoomProps[] | undefined;
  setShowRoomList?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  useEffect(() => {
    if (chatId === undefined && myRoomData) {
      navigate(`/chat?chatId=${myRoomData[0].id}`);
    }
    // eslint-disable-next-line
  }, [myRoomData]);

  return (
    <MainContainer>
      <PaddingBox />
      {myRoomData && myRoomData?.length > 0 ? (
        myRoomData.map((item, index) => {
          const isCurrentRoom = item.id === chatId;
          return (
            <ChattingRoom
              onClick={
                isCurrentRoom
                  ? () => {}
                  : () => {
                      navigate(`/chat?chatId=${item.id}`);
                      if (setShowRoomList) {
                        setShowRoomList(false);
                      }
                    }
              }
              key={index}
              data={item}
              isCurrentRoom={isCurrentRoom}
            />
          );
        })
      ) : (
        <ChattingRoom
          onClick={() => {
            if (setShowRoomList) {
              setShowRoomList(false);
            }
          }}
          isCurrentRoom={false}
          data={undefined}
        />
      )}
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
  position: relative;

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
