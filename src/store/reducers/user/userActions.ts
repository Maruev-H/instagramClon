import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseService, cookies, setToken } from "../../../baseServis/baseService";
import { Ilogin, IPosts } from "../../../types/IData";

export const signIn = createAsyncThunk<
  Ilogin,
  { username: string; password: string }
>("sign/in", async function ({ username, password }) {
  const res = await baseService.post(`/user/sign-in`, {
    username,
    password,
  });
  cookies.set('token', res.data.token)
  setToken()
  return res.data;
});

export const getUser = createAsyncThunk("get/user", async function () {
  const res = await baseService.get(`/user`, {
    headers: { Authorization: `Bearer ${cookies.get("token")}` },
  });
  setToken()
  return res.data;
});

export const createPost = createAsyncThunk<IPosts, {description: string; image: File}>( 
  'posts/create', 
  async function ({description, image}) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', image);
    const res = await baseService.post(`/posts`, formData)
    return res.data;
  }
)