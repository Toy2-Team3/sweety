import './App.css';
import { ThemeProvider } from 'styled-components';
import theme from '../src/styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      hello
    </ThemeProvider>
  );
}

export default App;
