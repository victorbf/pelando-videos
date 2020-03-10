import { createGlobalStyle } from 'styled-components';
import { FontColor } from './Variables.style';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
    font-color: ${FontColor};
  }
`;

export default GlobalStyle;
