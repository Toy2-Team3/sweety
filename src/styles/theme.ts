import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  color: {
    primary: '#D94E28',
    secondary: '#F9744C',
    black: '#111111',
    white: '#FFFFFF',
    borderGray: '#949494',
    darkGray: '#D9D9D9',
    lightGray: '#EFEFEF',
    successMessage: '#132f8b',
  },
  font: {
    name: 'Press Start 2P',
    title: '56px',
    smallSize: '14px',
    mediumSize: '16px',
    largeSize: '20px',
  },
  response: {
    tablet: '@media screen and (max-width: 1024px)',
    mobile: '@media screen and (max-width: 480px)',
  },
};

export default theme;
