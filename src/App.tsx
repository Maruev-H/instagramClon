import React, {useEffect}from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Auth from "./components/Auth/Auth";
import HomePage from "./components/HomePage/HomePage";
import SignIn from "./components/signIn/SignIn";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { getUser } from './store/reducers/user/instagramActions';

function App() {
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(getUser())
  }, [dispatch])
  
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
      </Routes>
    </div>
  );
}

export default App;

// как сделать так, чтобы когда isAuth = false кидало на роут /login
