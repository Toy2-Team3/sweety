import './App.css';
import { ThemeProvider } from 'styled-components';
import theme from '../src/styles/theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import CommunityListPage from './pages/CommunityListPage';
import CommunityEditPage from './pages/CommunityEditPage';
import ChatPage from './pages/chatting/index';
import MyPage from './pages/MyPage';
import styled from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App" style={{ display: 'flex' }}>
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
