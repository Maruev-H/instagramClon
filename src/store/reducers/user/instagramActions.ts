import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../api/api";
import { Ilogin, IPosts } from "../../../types/IData";

export const signIn = createAsyncThunk<
  Ilogin,
  { username: string; password: string }
>("sign/in", async function ({ username, password }) {
  const res = await axios.post(`${baseUrl}/user/sign-in`, {
    username,
    password,
  });
  return res.data;
});

export const getPosts = createAsyncThunk("users/upload", async function () {
  const res = await axios.get(`${baseUrl}/posts`);
  return res.data;
});

export const getUser = createAsyncThunk("get/user", async function () {
  const res = await axios.get(`${baseUrl}/user`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
});

export const createPost = createAsyncThunk<IPosts, {description: string; image: File}>( 
  'posts/create', 
  async function ({description, image}) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', image);
    const res = await axios.post(`${baseUrl}/posts`, formData, {headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
    return res.data;
  }
)