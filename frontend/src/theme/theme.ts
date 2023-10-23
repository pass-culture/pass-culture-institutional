import { Colors } from './colors'

export const theme = {
  colors: {
    primary: Colors.PRIMARY,
    secondary: Colors.SECONDARY,
    black: Colors.BLACK,
  },
  typography: {
    title1: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      lineHeight: '1.15',
      fontSize: '4rem',
      color: Colors.BLACK,
    },
    body: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      lineHeight: '1.5',
      fontSize: '1.5rem',
      color: Colors.BLACK,
    },
    buttonText: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      lineHeight: '0.75',
      fontSize: '1.25rem',
      color: Colors.BLACK,
    },
  },
} as const 

export type AppTheme = typeof theme
