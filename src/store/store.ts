import { configureStore } from "@reduxjs/toolkit";
import likeSlice from "./slices/likeSlice";
import restaurantSlice from "./slices/restaurantSlice";

export const store = configureStore({
  reducer: {
    like: likeSlice,
    restaurant: restaurantSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
