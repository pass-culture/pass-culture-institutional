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
    gray: Colors.GRAY,
    darkGray: Colors.DARK_GRAY,
    flashGreen: Colors.FLASH_GREEN,
    purple: Colors.PURPLE,
    lightGray: Colors.LIGHT_GRAY,
  },
  uniqueColors: {
    purple: '#ad86ff',
    green: '#27DCA8',
    magenta: '#F8045E',
    magentaLight: '#FF5996',
    magentaDark: '#CF1D5F',
    yellow: '#E5C216',
    yellowLight: '#FFD748',
    yellowDark: '#DFBD0C',
    orange: '#F0652B',
    orangeLight: '#FF8F60',
    orangeDark: '#E64B0A',
  },
  shadows: {
    popover: `${Shadows.POPOVER} ${Colors.GRAY}`,
    sticker: `${Shadows.STICKER} ${Colors.GRAY}`,
    banner: `${Shadows.STICKER} ${Colors.GRAY}`,
    contai: `${Shadows.STICKER} ${Colors.GRAY}`,
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
    emoji: {
      lineHeight: '1',
      fontSize: FontSizes['8XL'],
      fontWeight: FontWeights.BOLD,
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
    large: MediaQueries.LARGE,
  },
} as const

export type AppTheme = typeof theme
