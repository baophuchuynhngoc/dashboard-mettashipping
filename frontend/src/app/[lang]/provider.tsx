"use client";

import {ThemeProvider} from "styled-components";
import {GlobalStyle, theme} from "./utils/theme";

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
}
