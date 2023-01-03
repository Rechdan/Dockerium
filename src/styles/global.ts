import { createGlobalStyle } from "styled-components";

import { COLOR_BACKGROUND, COLOR_FONT } from "_/consts";

const GlobalStyle = createGlobalStyle(() => ({
  "*": {
    boxSizing: "border-box",
    padding: 0,
    border: 0,
    margin: 0,
    "& > *": {
      fontFamily: "inherit",
      lineHeight: "inherit",
      color: "inherit",
    },
  },

  "html, body": {
    backgroundColor: COLOR_BACKGROUND,
    fontFamily: "Roboto, sans-serif",
    color: COLOR_FONT,
  },

  a: {
    textDecoration: "none",
  },

  "a, label, button": {
    cursor: "pointer",
  },
}));

export default GlobalStyle;
