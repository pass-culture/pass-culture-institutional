import { Colors } from './colors'
import { FontSizes, FontWeights } from './fonts'
import { MediaQueries } from './media-queries'
import { Shadows } from './shadows'

export const theme = {
  colors: {
    aquamarine: Colors.AQUAMARINE,
    black: Colors.BLACK,
    darkGray: Colors.DARK_GRAY,
    deepink: Colors.DEEP_PINK,
    flashGreen: Colors.FLASH_GREEN,
    gold: Colors.GOLD,
    gray: Colors.GRAY,
    lightBlue: Colors.LIGHT_BLUE,
    lightGray: Colors.LIGHT_GRAY,
    lightLila: Colors.LIGHT_LILA,
    lila: Colors.LILA,
    pink: Colors.PINK,
    primary: Colors.PRIMARY,
    purple: Colors.PURPLE,
    saumon: Colors.SAUMON,
    secondary: Colors.SECONDARY,
    sky: Colors.SKY,
    tertiary: Colors.TERTIARY,
    white: Colors.WHITE,
  },

  uniqueColors: {
    blue: '#2D0390',
    blueDark: '#22046B',
    green: '#27DCA8',
    magenta: '#F8045E',
    magentaDark: '#A7146C',
    magentaLight: '#AF2C7A',
    orange: '#F0652B',
    orangeDark: '#E64B0A',
    orangeLight: '#FF8F60',
    purple: '#ad86ff',
    yellow: '#E5C216',
    yellowDark: '#DFBD0C',
    yellowLight: '#FFD748',
  },
  shadows: {
    popover: `${Shadows.POPOVER} ${Colors.GRAY}`,
    sticker: `${Shadows.STICKER} ${Colors.GRAY}`,
    banner: `${Shadows.STICKER} ${Colors.GRAY}`,
    contai: `${Shadows.STICKER} ${Colors.GRAY}`,
    buttonCircular: `${Shadows.CARROUSEL_BUTTON} ${Colors.DARK_GRAY}`,
  },
  radius: {
    sm: '0.5rem',
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
      '5xll': FontSizes['5XLL'],
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
    largeDesktop: MediaQueries.LARGE_DESKTOP,
    extraLargeDesktop: MediaQueries.EXTRA_LARGE_DESKTOP,
  },
} as const

export type AppTheme = typeof theme
