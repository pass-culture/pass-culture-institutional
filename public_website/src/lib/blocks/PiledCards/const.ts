import { PiledCardItemsTheme } from './piled-card-items-theme'
import { theme } from '@/theme/theme'

export const CARD_BACKGROUNDS: Record<PiledCardItemsTheme, string> = {
  blue: `linear-gradient(140.9deg, ${theme.uniqueColors.blue} 0%, ${theme.uniqueColors.blueDark} 100%)`,
  yellow: `linear-gradient(141.28deg, ${theme.uniqueColors.yellowLight} 1.24%, ${theme.uniqueColors.yellowDark} 97.04%)`,
  magenta: `linear-gradient(105.22deg, ${theme.uniqueColors.magentaLight} 1.06%, ${theme.uniqueColors.magenta} 100%)`,
  orange: `linear-gradient(139.76deg, ${theme.uniqueColors.orangeLight} -0.2%, ${theme.uniqueColors.orangeDark} 98.71%)`,
  green: theme.uniqueColors.green,
  purple: theme.uniqueColors.orange,
}
