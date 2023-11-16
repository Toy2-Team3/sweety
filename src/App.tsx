import SignUpSpecific2 from "./components/login/SignUpSpecific2";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpSpecific from "./components/login/SignUpSpecific";
import CommunityCreatePage from "./pages/CommunityCreatePage";
import CommunityListPage from "./pages/CommunityListPage";
import IntroPage from "./components/introPage/IntroPage";
import NavigationBar from "./components/NavigationBar";
import SignUpIDPW from "./components/login/SignUpIDPW";
import StartPage from "./components/login/StartPage";
import { ThemeProvider } from "styled-components";
import ChatPage from "./pages/chatting/index";
import Login from "./components/login/Login";
import { loginState } from "./recoil/atoms";
import { useRecoilState } from "recoil";
import HomePage from "./pages/HomePage";
import theme from "../src/styles/theme";
import styled from "styled-components";
import MyPage from "./pages/MyPage";
import "./App.css";
import { useEffect } from "react";
import CommunityUpdatePage from "./pages/CommunityUpdatePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [login, setLogin] = useRecoilState(loginState);

  const checkLoginStatus = () => {
    const isLoginValue = sessionStorage.getItem("isLogin");
    setLogin(isLoginValue === "true");
  };

  useEffect(() => {
    checkLoginStatus();
  });

  return login ? (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App" style={{ display: "flex" }}>
          <NavigationBar />
          <PageWrap>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/community" element={<CommunityListPage />} />
              <Route
                path="/community/create"
                element={<CommunityCreatePage />}
              />
              <Route
                path="/community/update/:id"
                element={<CommunityUpdatePage />}
              />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </PageWrap>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/signup1" element={<SignUpIDPW />} />
          <Route path="/signup2" element={<SignUpSpecific />} />
          <Route path="/signup3" element={<SignUpSpecific2 theme={theme} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const PageWrap = styled.div`
  flex: 1;
  margin-left: 300px;
  ${(props) => props.theme.response.tablet} {
    min-width: 30%;
    margin-left: 100px;
  }
  ${(props) => props.theme.response.mobile} {
    margin-left: 0;
    margin-bottom: 120px;
  }
`;

export default App;
