import { createSlice } from "@reduxjs/toolkit";
import { postState } from "../../../types/IData";
import {
  getPosts,
  createPost,
  deletePost,
  editPostAction,
  postLike,
  postUnLike,
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
    
    //получение постов
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
    /* -------------------------------------------------------------------------------------------------------- */

    //изменение постов
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
    /* -------------------------------------------------------------------------------------------------------- */

    //удаление постов
    builder.addCase(deletePost.pending, (state) => {
      console.log("ждем удаление поста");
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    });

    builder.addCase(deletePost.rejected, (state) => {
      console.log("ошибка при удалении поста");
    });
    /* -------------------------------------------------------------------------------------------------------- */

    //изменение постов
    builder.addCase(editPostAction.pending, (state) => {
      console.log(" ждем изменение поста");
    });

    builder.addCase(editPostAction.fulfilled, (state, action) => {
      console.log("пост удален");
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
    /* -------------------------------------------------------------------------------------------------------- */

    //лайкание постов
    builder.addCase(postLike.pending, (state, action) => {
      state.posts.map((post) => {
        if (post._id === action.meta.arg._id) {
          post.likes.push(action.meta.arg.userId);
          return post;
        }
        return post;
      });
    });


    builder.addCase(postLike.rejected, (state, action) => {
      state.posts.map((post) => {
        if (post._id === action.meta.arg._id) {
          post.likes.map((item , i, arr) => {
            if(item === action.meta.arg.userId){
              arr.splice(i, 1)
            }
          });
          return post;
        }
        return post;
      });
    });

    /* -------------------------------------------------------------------------------------------------------- */

    //удаление лайков с поста
    builder.addCase(postUnLike.pending, (state, action) => {
      state.posts.map((post) => {
        if (post._id === action.meta.arg._id) {
          post.likes.map((item , i, arr) => {
            if(item === action.meta.arg.userId){
              arr.splice(i, 1)
            }
          });
          return post;
        }
        return post;
      });
    });


    builder.addCase(postUnLike.rejected, (state, action) => {
      state.posts.map((post) => {
        if (post._id === action.meta.arg._id) {
          post.likes.push(action.meta.arg.userId);
          return post;
        }
        return post;
      });
    });

    /* -------------------------------------------------------------------------------------------------------- */
  },
});

export default postSlice.reducer;

export const { editPost } = postSlice.actions;
