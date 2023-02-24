import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseService } from "../../../baseServis/baseService";
import { IPosts } from "../../../types/IData";

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
  const res = await baseService.post(`}/posts`, formData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
  const res = await baseService.patch(
    `/posts/${_id}`,
    { description: description },
  );
  return res.data;
});