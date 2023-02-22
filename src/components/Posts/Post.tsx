import React from "react";
import { IPosts } from "../../types/IData";
import "./Post.scss";
import like from "../../pictures/PostIcons/likes.png";
import komments from "../../pictures/PostIcons/komments.png";
import share from "../../pictures/PostIcons/share.png";
import favorit from "../../pictures/PostIcons/Vector.png";
import smile from "../../pictures/PostIcons/smile.png";
import ReadMore from "../ReadMoreBtn/ReadMore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Post: React.FC<IPosts> = ({ image, likes, comments, created_at }) => { 

  dayjs.extend(relativeTime);

  const whatTime = () => {
    return dayjs(Number(created_at)).fromNow(); 
  };


  return (
    <div className="Post">
      <div className="Post__avatar">
        <div className="Post__img"></div>
      </div>
      <div className="Post__image">
        <img src={image} alt="d" />
      </div>
      <div className="Post__text">
        <div className="Post__icons">
          <div className="Post__left">
            <div>
              <img src={like} alt="" />
            </div>
            <div>
              <img src={komments} alt="" />
            </div>
            <div>
              <img src={share} alt="" />
            </div>
          </div>
          <div className="Post__right">
            <img src={favorit} alt="" />
          </div>
        </div>
        <div className="Post__likes">
          {likes} likes
        </div>
        <div className="Post__comments">
          <p>username</p>
          <ReadMore len={250}>{comments[1] || ''}</ReadMore>
        </div>
        <div className="Post__createdAt">
          {whatTime()}
        </div>
      </div>
      <div className="Post__input">
        <button className="smile">
          <img src={smile} alt="" />
        </button>
        <input placeholder="Add a comment"/>
        <button>post</button>
      </div>
    </div>
  );
};

export default Post;
