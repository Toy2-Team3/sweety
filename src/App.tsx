import styled from 'styled-components';
import './App.css';
import Home from './pages/HomePage';
const Nav = styled.div`
  width: 300px;
  height: 100%;
  background-color: black;
`;
function App() {
  return (
    <div className="App">
      <Nav />
      <Home />
    </div>
  );
}

export default App;
