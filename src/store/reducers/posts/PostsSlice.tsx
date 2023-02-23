import { createSlice,} from "@reduxjs/toolkit";
import { postState } from "../../../types/IData";
import { getPosts, createPost, deletePost } from "./postsActions";

const initialState: postState = {
  posts: [],
  isLoadingPosts: false
};

export const todoSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getPosts.pending, (state, action) => {
      state.isLoadingPosts = true
    });

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload
      state.isLoadingPosts = false
    });

    builder.addCase(getPosts.rejected, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(createPost.pending, (state) => {
      state.isLoadingPosts = true
      console.log('ожидаем');
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoadingPosts = false;
      state.posts.push(action.payload)

    });

    builder.addCase(createPost.rejected, (state) => {
      console.log('ошибка');
    });

    builder.addCase(deletePost.pending, (state) => {
      console.log('ждем удаление поста');
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload)
    });

    builder.addCase(deletePost.rejected, (state) => {
      console.log('ошибка при удалении поста');
    });


  },
});

export default todoSlice.reducer;
