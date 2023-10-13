import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      black: string;
    };
    typography: {
      title1: {
        fontFamily: string;
        lineHeight: string;
        fontSize: string;
        color: string;
      };
      body: {
        fontFamily: string;
        lineHeight: string;
        fontSize: string;
        color: string;
      };
      buttonText: {
        fontFamily: string;
        lineHeight: string;
        fontSize: string;
        color: string;
      };
    };
  }
}
