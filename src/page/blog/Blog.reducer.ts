import { createAction, createReducer, current } from "@reduxjs/toolkit";
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
export const cancelEditingPost = createAction('/blog/cancelEditingPost');
export const finishEditingPost = createAction<Post>("/blog/finishEditingPost");

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
    // cancelEditingPost
    .addCase(cancelEditingPost, (state, action) => {
        state.editingPost = null;
    })
    // finishEditingPost
    .addCase(finishEditingPost, (state, action) => {
        const postId = action.payload.id;
        state.postList.some((post, index) => {
            if(post.id === postId) {
                state.postList[index] = action.payload;
                return true
            }
            return false
        });
        state.editingPost = null;
    }).addMatcher((action) => action.type.includes("cancel"),(state, action) => {
        console.log(current(state))
    })
});
export default blogReducer;