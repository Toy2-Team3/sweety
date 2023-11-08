import 'styled-components';

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      second: string;
      black: string;
      white: string;
      darkGray: string;
      lightGray: string;
      successMessage: string;
    };

    font: {
      name: string;
      title: string;
      smallSize: string;
      mediumSize: string;
      largeSize: string;
    };

    response: {
      tablet: string;
      mobile: string;
    };
  }
}