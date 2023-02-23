import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Auth from "./components/Auth/Auth";
import HomePage from "./components/HomePage/HomePage";
import AddPost from "./components/NewPostForm/AddPost";
import SignIn from "./components/signIn/SignIn";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { getUser } from "./store/reducers/user/userActions";

function App() {

  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Auth>
              <HomePage />
            </Auth>
          }
        />
        <Route path="/login" element={<SignIn />} />
        {isAuth && <Route path="/post" element={<AddPost />} />}
      </Routes>
    </div>
  );
}

export default App;

// как сделать так, чтобы когда isAuth = false кидало на роут /login
