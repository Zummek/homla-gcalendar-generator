const lightPalette = {
  primary: {
    main: '#003566'
  },
  secondary: {
    main: '#3f5e94'
  },
  text: {
    primary: '#3a3433',
    secondary: 'rgba(58, 52, 51, 0.7)',
    low: 'rgb(200, 200, 200)',
    placeholder: 'rgba(0,0,0,0.2)'
  },
  background: {
    default: '#fffff',
    dark: '#f8f8f8',
    darker: '#dbdbdb'
  },
  border: {
    main: 'rgba(58,52,51,0.12)',
    light: 'rgba(58,52,51,0.05)'
  },
  button: {
    low: 'rgba(0,0,0,0.54)'
  },
  actions: {
    negative: '#ff0000',
    positive: '#00ff00',
    warning: '#ffa500',
    focused: '#2196f3'
  }
};

const darkPalette: Palette = {
  primary: {
    main: '#7396ff'
  },
  secondary: {
    main: '#3f5e94'
  },
  text: {
    primary: '#f1e9e7',
    secondary: 'rgba(241,233,231,0.6)',
    low: 'rgb(125, 125, 125)',
    placeholder: 'rgba(255,255,255,0.28)'
  },
  background: {
    default: '#121212',
    dark: '#121212',
    darker: '#202020'
  },
  border: {
    main: 'rgba(241,233,231,0.15)',
    light: 'rgba(241,233,231,0.05)'
  },
  button: {
    low: 'rgba(255,255,255,0.54)'
  },
  actions: {
    negative: '#ff0000',
    positive: '#00ff00',
    warning: '#ffa500',
    focused: '#2196f3'
  }
};

export type Palette = typeof lightPalette;

export const palettes = {
  light: lightPalette,
  dark: darkPalette
};
