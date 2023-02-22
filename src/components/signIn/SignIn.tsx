import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { signIn } from "../../store/reducers/user/instagramActions";
import "./SignIn.scss";

export default function SignIn() {

  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useAppSelector((state) => state.posts.currentUser)
  const { isLoading} = useAppSelector((state) => state.posts)

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
      <img src={require('../../pictures/instagram.jpg')} alt="s" />
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
        <button disabled={(!username || !password) || isLoading} className="btn btn-primary inp" type="button" onClick={handleClick}>
          Войти
        </button>
      </form>
      {!!token && <Navigate to="/"/>}
    </div>
  );
}

//Не удается найти модуль "../../pictures/instagram.jpg" или связанные с ним объявления типов. Почему выдает эту ошибку хотя фотография отображается. TypeScript
