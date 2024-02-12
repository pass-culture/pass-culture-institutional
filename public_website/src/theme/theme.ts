import { Colors } from './colors'
import { FontSizes, FontWeights } from './fonts'

export const theme = {
  colors: {
    black: Colors.BLACK,
    white: Colors.WHITE,
    hardBlue: Colors.HARD_BLUE,
    pinkOne: Colors.PINK_ONE,
  },
  fonts: {
    sizes: {
      xs: FontSizes.XS,
      s: FontSizes.S,
      m: FontSizes.M,
    },
    weights: {
      semiBold: FontWeights.SEMI_BOLD,
      bold: FontWeights.BOLD,
    },
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
