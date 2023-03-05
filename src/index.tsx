import { Container, CssBaseline } from "@mui/material";
import { setDefaultOptions } from "date-fns";
import { fr } from "date-fns/locale";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import AuthenticationProvider from "./components/authentication-provider";
import ErrorNotifier from "./components/error-notifier";
import Room from "./components/room";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

setDefaultOptions({ locale: fr });

root.render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <ErrorNotifier />
      <AuthenticationProvider>
        <Container>
          <Room />
        </Container>
      </AuthenticationProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
