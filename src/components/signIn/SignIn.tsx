import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {signIn } from "../../store/reducers/user/userActions";
import instLogo from '../../pictures/instagram.jpg'
import "./SignIn.scss";

export default function SignIn() {

  const location = useLocation()

  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth } = useAppSelector((state) => state.user)

  function handleChangeUserName(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleClick() {
    dispatch(signIn({ username, password }));
  }

  return (
    <div className="Form_auth">
      <img src={instLogo} alt="s" />
      <br></br>
      <form>
        <input
          className="Form_auth__username inp"
          placeholder="Телефон, имя пользователя или эл.адрес"
          lang="en"
          value={username}
          type="text"
          onChange={handleChangeUserName}
        />
        <br></br>
        <input
          className="Form_auth__password inp"
          placeholder="Пароль"
          value={password}
          type="password"
          onChange={handleChangePassword}
        />
        <br></br>
        <button disabled={(!username || !password)} className="btn btn-primary inp" type="button" onClick={handleClick}>
          Войти
        </button>
      </form>
      {isAuth && <Navigate to="/" state={{ from: location }} />}
    </div>
  );
}

//Не удается найти модуль "../../pictures/instagram.jpg" или связанные с ним объявления типов. Почему выдает эту ошибку хотя фотография отображается. TypeScript
