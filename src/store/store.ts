import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import tokenReducer from "./token.slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    token: tokenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
