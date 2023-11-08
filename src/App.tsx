import './App.css';
import { ThemeProvider } from 'styled-components';
import theme from '../src/styles/theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import ChatPage from './pages/chatting/index';
import MyPage from './pages/MyPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App" style={{ display: 'flex' }}>
          <NavigationBar></NavigationBar>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
