import styled from "styled-components";
import { ReactComponent as SweetLogo } from "../../assets/sweetyLogo.svg";
import { ReactComponent as GithubIcon } from "../../assets/githubIcon.svg";
import { useNavigate } from "react-router-dom";
import homeIntroImage from "../../assets/homeIntro.png";
import communityIntroImage from "../../assets/communityIntro.png";
import myPageIntroImage from "../../assets/myPageIntro.png";

function IntroPage() {
  const navigate = useNavigate();

  return (
    <>
      <LogoWrapper>
        <SweetLogo width="120px" />
      </LogoWrapper>
      <Header>
        <HeaderWrapper>
          <HeaderTextWrapper>
            <CopyText>
              <b>Sweety</b>에서 달콤한 인연을 찾아보세요.
            </CopyText>
            <SweetyButton onClick={() => navigate("/")}>
              sweety 이용하러 가기
            </SweetyButton>
          </HeaderTextWrapper>
        </HeaderWrapper>
      </Header>
      <Content>
        <ContentWrapper where="up">
          <ImageTextWrapper where="top">
            <PreviewImage number="1" src={homeIntroImage} alt="Description" />
            <Box style={{}}>
              <DescriptionText>
                <BoldText>쉽고 빠른 채팅</BoldText>
                마음에 드는 상대가 있나요?
                <br />
                채팅 버튼을 눌러
                <br />
                대화를 시작해보세요.
              </DescriptionText>
              <DescriptionText>
                <BoldText>나와의 점수</BoldText>
                대화하기 전에
                <br />
                나와 얼마나 잘 맞는지
                <br />
                확인해보세요.
              </DescriptionText>
            </Box>
          </ImageTextWrapper>
        </ContentWrapper>
        <ContentWrapper>
          <ImageTextWrapper where="middle">
            <Box>
              <DescriptionText>
                <BoldText>함께하면 즐거우니까</BoldText>
                자유로우면서 다양한
                <br />
                주제로 사람들과
                <br />
                소통할 수 있어요.
              </DescriptionText>
            </Box>
            <PreviewImage
              number="2"
              src={communityIntroImage}
              alt="Description"
            />
          </ImageTextWrapper>
        </ContentWrapper>
        <ContentWrapper where="bottom">
          <PreviewImage number="3" src={myPageIntroImage} alt="Description" />
          <Box>
            <DescriptionText>
              <BoldText>관심사 추가하기</BoldText>
              비슷한 관심사가 있다면
              <br />
              대화가 더 쉬워져요.
            </DescriptionText>
          </Box>
        </ContentWrapper>
      </Content>
      <Footer>
        <FooterTitle>Sweety Developers</FooterTitle>
        <div>김다빈, 박성후, 윤석민, 정서현, 채민석</div>
        <ContactInfo
          href="https://github.com/Toy2-Team3/sweety#readme"
          target="_blank"
        >
          <GithubIcon />
          <div>contact us</div>
        </ContactInfo>
      </Footer>
    </>
  );
}

export default IntroPage;

const SweetyButton = styled.button`
  font-size: 18px;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: ${(props) => props.theme.color.primary};
  color: white;
  border: none;
  border-radius: 12px;
`;

const Header = styled.div`
  width: 100vw;
  height: 250px;
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
  gap: 20px;
`;

const Content = styled.div`
  width: 100vw;
  height: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 150px;
`;

const ContentWrapper = styled.div<{ where?: string }>`
  display: flex;
  flex-direction: column;
  width: 100vw;
  ${({ where }) =>
    where === "up"
      ? { marginTop: "150px" }
      : { marginBottom: "150px", alignItems: "center" }}

  @media ${(props) => props.theme.response.tablet} {
    gap: 50px;
  }
  @media ${(props) => props.theme.response.mobile} {
    gap: 20px;
  }
  gap: 100px;
`;

const Box = styled.div`
  width: auto;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: auto;
  text-align: center;
`;

const CopyText = styled.h2`
  font-size: 20px;
`;

const DescriptionText = styled.p`
  line-height: 140%;
`;

const PreviewImage = styled.img<{ number: string }>`
  width: 220px;
  height: auto;

  ${({ number }) => {
    switch (number) {
      case "2":
        return `
          width: 280px;
        `;
      case "3":
        return `
          width: 320px;
        `;
      default:
        return null;
    }
  }}
  @media ${(props) => props.theme.response.mobile} {
    width: 180px;
  }

  @media ${(props) => props.theme.response.tablet} {
    width: 150px;
  }
`;

const BoldText = styled.p`
  font-weight: 800;
`;

const ContactInfo = styled.a`
  display: flex;
  flex-direction: row;
`;

const LogoWrapper = styled.div`
  position: fixed;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const FooterTitle = styled.h2`
  font-size: 30px;
  color: #d94e28;
`;

const ImageTextWrapper = styled.div<{ where: string }>`
  display: flex;
  justify-content: center;

  @media ${(props) => props.theme.response.tablet} {
    gap: 50px;
  }
  @media ${(props) => props.theme.response.mobile} {
    gap: 20px;
  }

  gap: 100px
    ${({ where }) =>
      where === "bottom"
        ? { flexDirection: "column" }
        : { flexDirection: "row" }};
`;
