const lightPalette = {
  primary: {
    main: '#9ab2f5'
  },
  secondary: {
    main: '#d0ecf5'
  },
  text: {
    primary: '#121111',
    secondary: 'rgba(58, 52, 51, 0.7)',
    low: 'rgb(100, 100, 100)',
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
    positive40: 'rgba(0, 200, 0)',
    warning: '#ffa500',
    focused: '#2196f3'
  }
};

const darkPalette: Palette = {
  primary: {
    main: '#7396ff'
  },
  secondary: {
    main: '#036166'
  },
  text: {
    primary: '#f1e9e7',
    secondary: 'rgba(241,233,231,0.6)',
    low: 'rgb(125, 125, 125)',
    placeholder: 'rgba(255,255,255,0.28)'
  },
  background: {
    default: '#121212',
    dark: '#383838',
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
    positive40: 'rgba(0, 255, 0, 0.4)',
    warning: '#ffa500',
    focused: '#2196f3'
  }
};

export type Palette = typeof lightPalette;

export const palettes = {
  light: lightPalette,
  dark: darkPalette
};
