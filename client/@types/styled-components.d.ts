// styled-components.d.ts
import 'styled-components';
import { Theme } from '../constants/theme.d';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
