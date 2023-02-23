import React, { useEffect } from "react";
import "./HomePage.scss";
import home from "../../pictures/icons/home.png";
import message from "../../pictures/icons/msg.png";
import add from "../../pictures/icons/add.png";
import trends from "../../pictures/icons/trends.png";
import heart from "../../pictures/icons/Vector1.png";
import ellipse from "../../pictures/icons/Ellipse 1.png";
import { BiSearch } from "react-icons/bi";
import { useAppDispatch } from "../../hooks/hooks";
import { getPosts } from "../../store/reducers/user/instagramActions";
import Posts from "../Posts/Posts";
import { NavLink } from "react-router-dom";
import instLogo from '../../pictures/instagram.jpg'

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
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
          <img src={ellipse} alt="" />
        </div>
      </header>
      <div className="Content">
        <Posts />
      </div>
    </div>
  );
}
