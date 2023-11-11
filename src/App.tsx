import SignUpSpecific2 from "./components/login/SignUpSpecific2";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpSpecific from "./components/login/SignUpSpecific";
import NavigationBar from "./components/NavigationBar";
import SignUpIDPW from "./components/login/SignUpIDPW";
import StartPage from "./components/login/StartPage";
import { ThemeProvider } from "styled-components";
import CommunityPage from "./pages/CommunityPage";
import ChatPage from "./pages/chatting/index";
import Login from "./components/login/Login";
import theme from "../src/styles/theme";
import HomePage from "./pages/HomePage";
import styled from "styled-components";
import MyPage from "./pages/MyPage";
import "./App.css";
import { useRecoilState } from "recoil";
import { loginState } from "./recoil/atoms";

function App() {
  const [login] = useRecoilState(loginState);

  return login ? (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App" style={{ display: "flex" }}>
          <NavigationBar></NavigationBar>
          <PageWrap>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/mypage" element={<MyPage />} />
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
          <Route path="/signup2" element={<SignUpSpecific theme={theme} />} />
          <Route path="/signup3" element={<SignUpSpecific2 theme={theme} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const PageWrap = styled.div`
  flex: 1;
  margin-left: 300px;

  ${(props) => props.theme.response.tablet} {
    margin-left: 100px;
  }

  ${(props) => props.theme.response.mobile} {
    margin-left: 0;
    margin-bottom: 120px;
  }
`;

export default App;
