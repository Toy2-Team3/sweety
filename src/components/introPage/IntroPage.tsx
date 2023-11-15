import styled from "styled-components";
import { ReactComponent as SweetLogo } from "../../assets/sweetyLogo.svg";
import { useNavigate } from "react-router-dom";

function IntroPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              alignItems: "center",
            }}
          >
            <CopyText>
              <b>Sweety</b>에서 달콤한 인연을 찾아보세요.
            </CopyText>
            <SweetyButton onClick={() => navigate("/")}>
              sweety 이용하러 가기
            </SweetyButton>
          </div>
          <SweetLogo path={{ width: "350px" }} />
        </div>
      </Header>
      <Content>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <p>나와 잘 맞는지 궁금하니까</p>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Box>모바일 홈화면 디테일 모달 이미지</Box>
            <Box>
              <p>
                쉽고 빠른 채팅, 마음에 드는 상대가 있나요?, 채팅 버튼을 눌러,
                대화를 시작해보세요.
              </p>
              <p>
                나와의 점수, 대화하기 전에, 나와 얼마나 잘 맞는지, 확인해보세요.
              </p>
            </Box>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Box>
              함께하면 즐거우니까, 자유로우면서 다양한, 주제로 사람들과, 소통할
              수 있어요.
            </Box>
            <Box>커뮤니티 모달이미지</Box>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Box>마이페이지 수정 이미지</Box>
            <Box>
              관심사 추가하기, 비슷한 관심사가 있다면, 대화가 더 쉬워져요.
            </Box>
          </div>
        </div>
      </Content>
      <Footer>
        <div>Sweety Developers</div>
        <div>김다빈, 박성후, 윤석민, 정서현, 채민석</div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>깃허브 아이콘</div>
          <div>contact us</div>
        </div>
      </Footer>
    </>
  );
}

export default IntroPage;

const SweetyButton = styled.button`
  font-size: 18px;
  width: 200px;
  height: 50px;
  cursor: pointer;
  background: ${(props) => props.theme.color.primary};
  color: white;
  border: none;
  border-radius: 12px;
`;

const Header = styled.div`
  width: 100vw;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9dbc5;
  text-align: center;
`;

const Footer = styled.div`
  width: 100vw;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9dbc5;
  text-align: center;
`;

const Content = styled.div`
  width: 100vw;
  height: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 200px;
  height: 200px;
`;

const CopyText = styled.h2`
  font-size: 20px;
`;
