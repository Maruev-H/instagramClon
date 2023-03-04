import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseService, cookies } from "../../../Api/baseService";
import { IPosts } from "../../../types/IPosts";

export const getPosts = createAsyncThunk("users/upload", async function () {
  const res = await baseService.get(`/posts`);
  return res.data;
});

export const createPost = createAsyncThunk<
  IPosts,
  { description: string; image: File }
>("posts/create", async function ({ description, image }) {
  const formData = new FormData();
  formData.append("description", description);
  formData.append("image", image);
  const res = await baseService.post(`posts`, formData, {
    headers: { Authorization: `Bearer ${cookies.get("token")}` },
  });
  return res.data;
});

export const deletePost = createAsyncThunk<string, string>(
  "posts/delete",
  async function (_id) {
    await baseService.delete(`/posts/${_id}`);
    return _id;
  }
);

export const editPostAction = createAsyncThunk<
  IPosts,
  { _id: string; description: string }
>("post/edit", async function ({ _id, description }) {
  const res = await baseService.patch(`/posts/${_id}`, {
    description: description,
  });
  return res.data;
});

export const postLike = createAsyncThunk<
  { _id: string; userId: string },
  { _id: string; userId: string }
>("posts/like", async function ({ _id, userId }) {
  const res = await baseService.post(`/posts/${_id}/like`);
  return { _id, userId };
});

export const postUnLike = createAsyncThunk<
  { _id: string; userId: string },
  { _id: string; userId: string }
>("posts/unlike", async function ({ _id, userId }) {
  const res = await baseService.post(`/posts/${_id}/unlike`);
  return { _id, userId };
});
