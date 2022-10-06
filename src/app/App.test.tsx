import { ThemeProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/lab";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { test } from "vitest";

import App from "./App";
import { store } from "./store";
import theme from "./theme";
test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
