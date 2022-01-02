import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

// This is the default breakpoint
const breakpoints = createBreakpoints({
  sm: "320px",
  md: "1300px",
  lg: "1500px",
});

const colors = {
  brand: {
      100: "#E63946",
      200: "#F1FAEE",
      300: "#A8DADC",
      400: "#457B9D",
      500: "#1D3557",
  },
};
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ breakpoints, colors, config });

const rootElement = document.getElementById("root");

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  rootElement
);