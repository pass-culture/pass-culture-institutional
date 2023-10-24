import 'styled-components'
import { AppTheme } from '@/theme/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
