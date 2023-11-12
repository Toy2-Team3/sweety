import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/sweetyLogo.svg";
import { ReactComponent as Icon } from "../assets/sweetyIcon.svg";
import { ReactComponent as HomeIcon } from "../assets/homeIcon.svg";
import { ReactComponent as CommunityIcon } from "../assets/communityIcon.svg";
import { ReactComponent as ChatIcon } from "../assets/chattingIcon.svg";
import { ReactComponent as MyPageIcon } from "../assets/mypageIcon.svg";
import { ReactComponent as SettingIcon } from "../assets/settingIcon.svg";
import { ReactComponent as ActivedHomeIcon } from "../assets/activedHomeIcon.svg";
import { ReactComponent as ActivedCommunityIcon } from "../assets/activedCommunityIcon.svg";
import { ReactComponent as ActivedChatIcon } from "../assets/activedChattingIcon.svg";
import { ReactComponent as ActivedMyPageIcon } from "../assets/activedMypageIcon.svg";
import { ReactComponent as ActivedSettingIcon } from "../assets/activedSettingIcon.svg";
import { useSetRecoilState } from "recoil";
import { loginState } from "../recoil/atoms";

const categories = [
  {
    id: "home",
    label: "Home",
    defaultClicked: true,
    icon: <HomeIcon />,
    activeIcon: <ActivedHomeIcon />,
  },
  {
    id: "community",
    label: "Community",
    defaultClicked: false,
    icon: <CommunityIcon />,
    activeIcon: <ActivedCommunityIcon />,
  },
  {
    id: "chat",
    label: "Chat",
    defaultClicked: false,
    icon: <ChatIcon />,
    activeIcon: <ActivedChatIcon />,
  },
  {
    id: "mypage",
    label: "MyPage",
    defaultClicked: false,
    icon: <MyPageIcon />,
    activeIcon: <ActivedMyPageIcon />,
  },
];

export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("");
  const [isSettingClicked, setIsSettingClicked] = useState(false);
  const setLogin = useSetRecoilState(loginState);

  const logOut = () => {
    setLogin(false);
    sessionStorage.removeItem("accessToken");
    navigate("/");
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    navigate(categoryId === "home" ? `/` : `/${categoryId}`);
  };

  const handleOpenSettingBox = () => {
    setIsSettingClicked(!isSettingClicked);
  };

  useEffect(() => {
    setActiveCategory("home");
  }, []);

  // 새로고침 시 저장되도록
  useEffect(() => {
    const savedCategory = location.pathname.replace("/", "");
    console.log(savedCategory);

    if (savedCategory) {
      setActiveCategory(savedCategory);
    }
  }, [location]);

  return (
    <NavigationWrap>
      <TopDiv>
        <LogoWrap onClick={() => handleCategoryClick("home")}>
          <Logo style={{ fill: "red" }} />
        </LogoWrap>
        <IconWrap onClick={() => handleCategoryClick("home")}>
          <Icon />
        </IconWrap>
        <CategoryWrap>
          {categories.map((category) => (
            <ClickedBox
              key={category.id}
              $isClicked={activeCategory === category.id}
            >
              <CategoryButton onClick={() => handleCategoryClick(category.id)}>
                {activeCategory === category.id
                  ? category.activeIcon
                  : category.icon}
                <CategoryTitle $isClicked={activeCategory === category.id}>
                  {category.label}
                </CategoryTitle>
              </CategoryButton>
            </ClickedBox>
          ))}
        </CategoryWrap>
      </TopDiv>
      <BottomDiv>
        <SettingBox $isClicked={isSettingClicked}>
          <SettingMenu onClick={logOut}>로그아웃</SettingMenu>
          <Divider></Divider>
          <SettingMenu>다른 설정...</SettingMenu>
        </SettingBox>
        <ClickedBox $isClicked={isSettingClicked}>
          <SettingButton onClick={handleOpenSettingBox}>
            {isSettingClicked ? <ActivedSettingIcon /> : <SettingIcon />}
            <CategoryTitle $isClicked={isSettingClicked}>
              Settings
            </CategoryTitle>
          </SettingButton>
        </ClickedBox>
      </BottomDiv>
    </NavigationWrap>
  );
}

const NavigationWrap = styled.div`
  border-right: 1px solid ${(props) => props.theme.color.borderGray};
  background: ${(props) => props.theme.color.white};
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 100vh;
  z-index: 9;

  ${(props) => props.theme.response.tablet} {
    width: 100px;
  }

  ${(props) => props.theme.response.mobile} {
    border-top: 1px solid ${(props) => props.theme.color.borderGray};
    border-right: none;
    width: 100%;
    height: auto;
    position: fixed;
    bottom: 0;
  }
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  ${(props) => props.theme.response.tablet} {
    gap: 40px;
  }

  ${(props) => props.theme.response.mobile} {
    width: 100%;
    align-items: center;
  }
`;

const BottomDiv = styled.div`
  margin-bottom: 30px;
  position: relative;

  ${(props) => props.theme.response.mobile} {
    display: none;
  }
`;

const LogoWrap = styled.div`
  margin-top: 40px;

  &:hover {
    cursor: pointer;
  }

  ${(props) => props.theme.response.tablet} {
    display: none;
  }
`;

const IconWrap = styled.div`
  display: none;
  margin-top: 30px;

  &:hover {
    cursor: pointer;
  }

  ${(props) => props.theme.response.tablet} {
    display: flex;
    justify-content: center;
  }

  ${(props) => props.theme.response.mobile} {
    display: none;
  }
`;

const CategoryWrap = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${(props) => props.theme.response.mobile} {
    flex-direction: row;
    padding: 15px 0;
    flex: 1;
  }
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px 30px;
  width: 100%;
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }

  ${(props) => props.theme.response.tablet} {
    padding: 18px;
  }
`;

const CategoryTitle = styled.span<{ $isClicked: boolean }>`
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  color: ${(props) =>
    props.$isClicked
      ? (props) => props.theme.color.primary
      : (props) => props.theme.color.black};

  ${(props) => props.theme.response.tablet} {
    display: none;
  }
`;

const SettingButton = styled.button`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px 30px;
  width: 100%;
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }

  ${(props) => props.theme.response.tablet} {
    padding: 18px;
  }
`;

const ClickedBox = styled.div<{ $isClicked: boolean }>`
  border-radius: 20px;
  background-color: ${(props) =>
    props.$isClicked ? (props) => props.theme.color.lightGray : "transparent"};
`;

const SettingBox = styled.div<{ $isClicked: boolean }>`
  width: 100%;
  height: 112px;
  flex-shrink: 0;
  border-radius: 20px;
  background: ${(props) => props.theme.color.lightGray};
  margin-bottom: 10px;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  bottom: 75px;
  left: 0;
  display: ${(props) => (props.$isClicked ? "flex" : "none")};

  ${(props) => props.theme.response.tablet} {
    width: 170px;
  }
`;

const SettingMenu = styled.span`
  color: ${(props) => props.theme.color.black};
  text-align: center;
  font-size: ${(props) => props.theme.font.largeSize};
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    cursor: pointer;
  }
`;

const Divider = styled.div`
  border: 0.5px solid ${(props) => props.theme.color.borderGray};
`;
