import React from "react";
import home from "../../../pictures/icons/home.png";
import message from "../../../pictures/icons/msg.png";
import add from "../../../pictures/icons/add.png";
import trends from "../../../pictures/icons/trends.png";
import heart from "../../../pictures/icons/Vector1.png";
import { BiSearch } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import instLogo from "../../../pictures/instagram.jpg";
import { useAppSelector } from "../../../hooks/hooks";

const Header = () => {
  
  const { avatar } = useAppSelector((state) => state.user.currentUser);

  return (
    <header>
      <div className="Image">
        <img src={instLogo} alt="" />
      </div>
      <div className="search">
        <input />
        <label className="label">
          <BiSearch /> <span>Search</span>
        </label>
      </div>
      <div className="icons">
        <NavLink to="/">
          <img src={home} alt="" />
        </NavLink>

        <img src={message} alt="" />
        <NavLink to="/post">
          {" "}
          <img src={add} alt="" />
        </NavLink>
        <img src={trends} alt="" />
        <img src={heart} alt="" />
        <div>
          {" "}
          <img src={avatar} alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
