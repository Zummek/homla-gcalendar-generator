import 'styled-components';
import { Palette } from './customPalette';

// TODO remove this slice module
/* This is the suggested way of declaring theme types */
declare module 'styled-components' {
  export interface DefaultTheme extends Palette {}
}
