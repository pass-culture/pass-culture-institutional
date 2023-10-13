import "styled-components";
import { Colors } from "./colors";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: Colors;
      secondary: Colors;
      black: Colors;
    };
    typography: {
      title1: {
        fontFamily: string;
        lineHeight: string;
        fontSize: string;
        color: Colors;
      };
      body: {
        fontFamily: string;
        lineHeight: string;
        fontSize: string;
        color: Colors;
      };
      buttonText: {
        fontFamily: string;
        lineHeight: string;
        fontSize: string;
        color: Colors;
      };
    };
  }
}
