import { createAction, createReducer } from "@reduxjs/toolkit";
import { Post } from "../../types/Blog.type";
import { initalPostList } from "../../constants/blog";

interface BlogState {
    postList: Post[];
    editingPost: Post | null;
};

const initialState: BlogState = {
    postList: initalPostList,
    editingPost: null
};

export const addPost = createAction<Post>("blog/addPost");
export const deletePost = createAction<string>("blog/deletePost");
export const startEditingPost = createAction<string>("/blog/startEdittingPost");

const blogReducer = createReducer(initialState, builder => {
    builder
    // handle addPost
    .addCase(addPost, (state, action) => {
        // immerJs ( mutate safe state )
        const post = action.payload;
        state.postList.push(post);
    })
    // handle deletePost
    .addCase(deletePost, (state, action) => {
        const postId = action.payload;
        const foundPostIndex = state.postList.findIndex(post => post.id === postId);
        if(foundPostIndex !== -1) {
            state.postList.splice(foundPostIndex, 1);
        };
    })
    // handle EditingPost
    .addCase(startEditingPost, (state, action) => {
        const postId = action.payload;
        const foundPost = state.postList.find((post) => post.id === postId) || null
        state.editingPost = foundPost;
    })
});
export default blogReducer;