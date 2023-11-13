import SignUpSpecific2 from "./components/login/SignUpSpecific2";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpSpecific from "./components/login/SignUpSpecific";
import CommunityEditPage from "./pages/CommunityEditPage";
import CommunityListPage from "./pages/CommunityListPage";
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

function App() {
  const [login] = useRecoilState(loginState);

  // return (
  //   <ThemeProvider theme={theme}>
  //     <BrowserRouter>
  //       <div className="App" style={{ display: "flex" }}>
  //         <NavigationBar></NavigationBar>
  //         <PageWrap>
  //           <Routes>
  //             <Route path="/" element={<HomePage />} />
  //             <Route path="/community" element={<CommunityListPage />} />
  //             <Route path="/community/edit" element={<CommunityEditPage />} />
  //             <Route path="/chat" element={<ChatPage />} />
  //             <Route path="/mypage" element={<MyPage />} />
  //           </Routes>
  //         </PageWrap>
  //       </div>
  //     </BrowserRouter>
  //   </ThemeProvider>
  // );

  return login ? (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App" style={{ display: "flex" }}>
          <NavigationBar></NavigationBar>
          <PageWrap>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/community" element={<CommunityListPage />} />
              <Route path="/community/edit" element={<CommunityEditPage />} />
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
    min-width: 30%;
    margin-left: 100px;
  }
  ${(props) => props.theme.response.mobile} {
    margin-left: 0;
    margin-bottom: 120px;
  }
`;

export default App;
