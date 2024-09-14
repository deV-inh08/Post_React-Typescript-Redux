import {configureStore} from "@reduxjs/toolkit";
import blogReducer from "./page/blog/Blog.reducer";

// genarate => store
export const store = configureStore({
    reducer: {
        blog: blogReducer
    }
});

// get RootState and AppDispatch from our store
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

