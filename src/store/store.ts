import { configureStore } from "@reduxjs/toolkit";
import { api, errorMiddleware } from "./api";
import errorNotificationReducer from "./error-notification.slice";
import tokenReducer from "./token.slice";

/**
 * Initialisation of redux store
 */
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    token: tokenReducer,
    errorNotification: errorNotificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(errorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
