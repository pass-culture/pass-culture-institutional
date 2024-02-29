import { Colors } from './colors'
import { FontSizes, FontWeights } from './fonts'
import { MediaQueries } from './media-queries'
import { Shadows } from './shadows'

export const theme = {
  colors: {
    black: Colors.BLACK,
    white: Colors.WHITE,
    primary: Colors.PRIMARY,
    secondary: Colors.SECONDARY,
    tertiary: Colors.TERTIARY,
    lightBlue: Colors.LIGHT_BLUE,
    lightGray: Colors.LIGHT_GRAY,
    flashGreen: Colors.FLASH_GREEN,
    purple: Colors.PURPLE,
  },
  shadows: {
    popover: `${Shadows.POPOVER} ${Colors.LIGHT_GRAY}`,
    sticker: `${Shadows.STICKER} ${Colors.LIGHT_GRAY}`,
  },
  fonts: {
    sizes: {
      '2xs': FontSizes['2XS'],
      xs: FontSizes.XS,
      s: FontSizes.S,
      m: FontSizes.M,
      l: FontSizes.L,
      xl: FontSizes.XL,
      '2xl': FontSizes['2XL'],
      '3xl': FontSizes['3XL'],
      '4xl': FontSizes['4XL'],
      '5xl': FontSizes['5XL'],
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
    heading1: {
      desktop: {
        lineHeight: '1.3',
        fontSize: FontSizes['8XL'],
        fontWeight: FontWeights.BOLD,
        color: Colors.SECONDARY,
      },
      mobile: {
        fontSize: FontSizes['5XL'],
      },
    },
    heading2: {
      desktop: {
        lineHeight: '1.25',
        fontSize: FontSizes['6XL'],
        fontWeight: FontWeights.BOLD,
        color: Colors.SECONDARY,
      },
      mobile: {
        fontSize: FontSizes['3XL'],
      },
    },
    heading3: {
      desktop: {
        lineHeight: '1.4',
        fontSize: FontSizes['4XL'],
        fontWeight: FontWeights.BOLD,
        color: Colors.BLACK,
      },
      mobile: {
        fontSize: FontSizes['2XL'],
      },
    },
    borderedText: {
      desktop: {
        lineHeight: '1',
        fontSize: FontSizes['5XL'],
        fontWeight: FontWeights.BLACK,
        color: Colors.WHITE,
      },
      mobile: {
        fontSize: FontSizes['4XL'],
      },
    },
    emoji: {
      lineHeight: '1',
      fontSize: FontSizes['8XL'],
      fontWeight: FontWeights.BOLD,
      // boxShadow: `${Shadows.STICKER} ${Colors.LIGHT_GRAY}`,
    },
    body: {
      desktop: {
        lineHeight: '2',
        fontSize: FontSizes.L,
        fontWeight: FontWeights.MEDIUM,
        color: Colors.BLACK,
      },
      mobile: {
        fontSize: FontSizes.S,
      },
    },
  },
  mediaQueries: {
    mobile: MediaQueries.MOBILE,
    tablet: MediaQueries.TABLET,
  },
} as const

export type AppTheme = typeof theme
