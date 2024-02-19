import { Colors } from './colors'
import { FontSizes, FontWeights } from './fonts'

export const theme = {
  colors: {
    black: Colors.BLACK,
    white: Colors.WHITE,
    primary: Colors.PRIMARY,
    secondary: Colors.SECONDARY,
    lightBlue: Colors.LIGHT_BLUE,
    lightGray: Colors.LIGHT_GRAY,
  },
  shadows: {
    popover: `-0.25rem 0.5rem 0.875rem 0 ${Colors.LIGHT_GRAY}`,
    sticker: `-0.25rem 0.5rem 1.5rem 0 ${Colors.LIGHT_GRAY}`,
  },
  fonts: {
    sizes: {
      '2xs': FontSizes['2XS'],
      xs: FontSizes.XS,
      s: FontSizes.S,
      m: FontSizes.M,
      l: FontSizes.L,
      xl: FontSizes.XL,
      '3xl': FontSizes['3XL'],
      '4xl': FontSizes['4XL'],
      '5xl': FontSizes['3XL'],
      '6xl': FontSizes['6XL'],
      '7xl': FontSizes['7XL'],
      '8xl': FontSizes['8XL'],
    },
    weights: {
      medium: FontWeights.MEDIUM,
      semiBold: FontWeights.SEMI_BOLD,
      bold: FontWeights.BOLD,
      black: FontWeights.BLACK,
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
  mediaQueries: {
    mobile: '50rem', // 800px
    tablet: '62.5rem', // 1000px
  },
} as const

export type AppTheme = typeof theme
