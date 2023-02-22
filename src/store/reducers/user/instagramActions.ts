import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../api/api";
import { Ilogin,} from "../../../types/IData";

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
  console.log(res)
  return res.data;
});

export const getUser = createAsyncThunk(
  'get/user',
  async function () {
    const res = await axios.get(`${baseUrl}/user`, 
    {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`},
  });
    console.log(res)
    return res.data
  }
);
