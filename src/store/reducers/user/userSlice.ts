import { createSlice,} from "@reduxjs/toolkit";
import { cookies } from "../../../Api/baseService";
import { userState } from "../../../types/IUser";
import { logOut, signIn } from "./userActions";

const initialState: userState = {
  currentUser: {
    token: cookies.get('token') || '',
    username: "",
    _id: "",
    avatar: "",
  },
  isAuth: false,
  isLoading: false
};

export const todoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    // авторизация
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.currentUser = action.payload
    });

    builder.addCase(signIn.rejected, (state, action) => {
      state.isAuth = false;
    });
     /* -------------------------------------------------------------------------------------------------------- */

     //проверка токена
    builder.addCase(logOut.pending, (state) => {
      state.isLoading = true
      state.isAuth = false
    });
    
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.currentUser = action.payload
    });
    
    builder.addCase(logOut.rejected, (state) => {
      cookies.remove('token')
      state.isLoading = false
    });
  },
   /* -------------------------------------------------------------------------------------------------------- */
});
export default todoSlice.reducer;
