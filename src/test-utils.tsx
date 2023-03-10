/**
 * this file is from a thread on stackoverflow for provide a mock store to component when they will be rendered in Unit test
 * https://stackoverflow.com/a/72502767
 */
import React, { type ReactElement } from "react";
import { Provider } from "react-redux";
import {
  render as rtlRender,
  type RenderOptions,
} from "@testing-library/react";
import {
  configureStore,
  type EmptyObject,
  type EnhancedStore,
  type PreloadedState,
} from "@reduxjs/toolkit";

import { api, errorNotificationSlice, tokenSlice } from "./store";
import type { RootState } from "./store";

type ReducerTypes = Pick<RootState, "token" | "errorNotification" | "api">;
type TStore = EnhancedStore<ReducerTypes>;

type CustomRenderOptions = {
  preloadedState?: PreloadedState<ReducerTypes & EmptyObject>;
  store?: TStore;
} & Omit<RenderOptions, "wrapper">;

function render(ui: ReactElement, options?: CustomRenderOptions) {
  const { preloadedState } = options ?? {};

  const store =
    options?.store ??
    configureStore({
      reducer: {
        token: tokenSlice.reducer,
        errorNotification: errorNotificationSlice.reducer,
        [api.reducerPath]: api.reducer,
      },
      preloadedState,
    });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// eslint-disable-next-line import/export
export * from "@testing-library/react";
// eslint-disable-next-line import/export
export { render };
