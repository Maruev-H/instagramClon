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

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      <header>
        <div className="Image">
          <img src={require("../../pictures/instagram.jpg")} alt="" />
        </div>

        <div className="search">
          <input />
          <label className="label">
            <BiSearch /> <span>Search</span>
          </label>
        </div>
        <div className="icons">
          <img src={home} alt="" />
          <img src={message} alt="" />
          <img src={add} alt="" />
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
