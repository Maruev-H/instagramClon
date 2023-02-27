import { createSlice,} from "@reduxjs/toolkit";
import { cookies } from "../../../baseServis/baseService";
import { userState } from "../../../types/IData";
import { getUser, signIn } from "./userActions";

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
      console.log("неправильный логин или пароль");
      state.isAuth = false;
    });
     /* -------------------------------------------------------------------------------------------------------- */

     //проверка токена
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
   /* -------------------------------------------------------------------------------------------------------- */
});
export default todoSlice.reducer;
