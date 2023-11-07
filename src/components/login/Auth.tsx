import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage';
import SignUpIDPW from './SignUpIDPW';
import SignUpSpecific from './SignUpSpecific';
import Login from './Login';

function Auth() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/signup1" element={<SignUpIDPW />} />
        <Route path="/signup2" element={<SignUpSpecific />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default Auth;
