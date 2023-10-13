import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primary: "#eb0055",
    secondary: "#320096",
    black: "#111",
  },
  typography: {
    title1: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      lineHeight: "1.15",
      fontSize: "4rem",
      color: "#111",
    },
    body: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      lineHeight: "1.5",
      fontSize: "1.5rem",
      color: "#111",
    },
    buttonText: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      lineHeight: "0.75",
      fontSize: "1.25rem",
      color: "#111",
    },
  },
};
