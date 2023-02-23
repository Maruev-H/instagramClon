import { createSlice,} from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";
import { postState } from "../../../types/IData";
import { getPosts, getUser, signIn } from "./instagramActions";

const initialState: postState = {
  posts: [],
  currentUser: {
    token: localStorage.getItem('token') || '',
    username: "",
    _id: "",
    avatar: "",
  },
  isAuth: false,
  isLoading: false
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.currentUser = action.payload
      localStorage.setItem('token', action.payload.token)
    });

    builder.addCase(signIn.rejected, (state, action) => {
      console.log("неправильный логин или пароль");
      state.isAuth = false;
    });
    
    builder.addCase(getPosts.pending, (state, action) => {
      state.isLoading = true
    });

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload
      state.isLoading = false
    });

    builder.addCase(getPosts.rejected, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true
      state.isAuth = false
      console.log("ожидание")
    });
    
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.currentUser = action.payload
      console.log("авторизирован")
    });
    
    builder.addCase(getUser.rejected, (state) => {
      localStorage.removeItem('token')
      state.isLoading = false
      console.log("токен был удален")
    });
  },
});

export default todoSlice.reducer;
