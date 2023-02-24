import { createSlice } from "@reduxjs/toolkit";
import { postState } from "../../../types/IData";
import {
  getPosts,
  createPost,
  deletePost,
  editPostAction,
} from "./postsActions";

const initialState: postState = {
  posts: [],
  isLoadingPosts: false,
  editPostId: "",
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    editPost: (state, action) => {
      state.editPostId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.isLoadingPosts = true;
    });

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoadingPosts = false;
    });

    builder.addCase(getPosts.rejected, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(createPost.pending, (state) => {
      state.isLoadingPosts = true;
      console.log("ожидаем");
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoadingPosts = false;
      state.posts.push(action.payload);
    });

    builder.addCase(createPost.rejected, (state) => {
      console.log("ошибка");
    });

    builder.addCase(deletePost.pending, (state) => {
      console.log("ждем удаление поста");
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    });

    builder.addCase(deletePost.rejected, (state) => {
      console.log("ошибка при удалении поста");
    });

    builder.addCase(editPostAction.pending, (state) => {
      console.log(" ждем изменение поста");
    });

    builder.addCase(editPostAction.fulfilled, (state, action) => {
      console.log('пост изменен')
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
    });

    builder.addCase(editPostAction.rejected, () => {
      console.log("ошибка при изменении поста");
    });
  },
});

export default postSlice.reducer;

export const { editPost } = postSlice.actions;
