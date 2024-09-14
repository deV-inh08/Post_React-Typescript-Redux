import { createAction, createReducer } from "@reduxjs/toolkit";
import { Post } from "../../types/Blog.type";
import { initalPostList } from "../../constants/blog";

interface BlogState {
    postList: Post[];
}

const initialState: BlogState = {
    postList: initalPostList
}

export const addPost = createAction<Post>("blog/addPost")

const blogReducer = createReducer(initialState, builder => {
    // addCase
    builder.addCase(addPost, (state, action) => {
        // immerJs ( mutate safe state )
        const post = action.payload;
        state.postList.push(post);
    })
});

export default blogReducer;