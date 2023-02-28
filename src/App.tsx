import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Auth from "./pages/Auth/Auth";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/signIn/SignIn";
import { logOut } from "./store/reducers/user/userActions";

function App() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(logOut());
  }, [dispatch]);

  return (
    <div className="App">
      {isLoading && <div className="Loader">
        <div>Loading...</div>
        </div>}
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
      </Routes>
    </div>
  );
}

export default App;

