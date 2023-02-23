import React, { useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deletePost } from "../../store/reducers/posts/postsActions";

const Post: React.FC<IPosts> = ({
  image,
  likes,
  created_at,
  description,
  user,
  comments,
  _id,
}) => {
  
  const [comment, setComment] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  const { username } = useAppSelector((state) => state.user.currentUser);
  const [changePost, setChangePost] = useState(false);
  const dispatch = useAppDispatch()

  const postDelete = () =>{
    dispatch(deletePost(_id))
  }

  const whatTime = () => {
    dayjs.extend(relativeTime);
    return dayjs(Number(created_at)).fromNow();
  };

  return (
    <div className="Post">
      <div className="Post__avatar">
        <div className="Post__img">
          <div className="Post__ava">
            <img src={user.avatar} alt="" />
          </div>
          <p className="p">{user.username}</p>
          <div className="Post__changer">
            {username === user.username && (
              <>
                <button className="Post__change" onClick={()=>{setChangePost(!changePost)}}>
                  <div className="butt"></div>
                  <div className="butt"></div>
                  <div className="butt"></div>
                </button>
                <button className={`PostChangeButton first ${changePost ? 'block' : 'none'}`}>Edit</button><br/>
                <button  onClick={postDelete} className={`PostChangeButton second ${changePost ? 'block' : 'none'}`}>Delete</button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="Post__image">
        <img src={image} alt="" />
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
        <div className="Post__likes">{likes} likes</div>
        <div className="Post__comments">
          <p>{user.username}</p>
          <ReadMore len={250}>{description}</ReadMore>
        </div>
        <div className="Post__createdAt">
          {comments.length > 0
            ? `See ${comments.length} comments`
            : `0 comments`}
        </div>
        <div className="Post__createdAt">{whatTime()}</div>
      </div>
      <div className="Post__input">
        <button className="smile">
          <img src={smile} alt="" />
        </button>
        <input
          placeholder="Add a comment"
          value={comment}
          onChange={handleChange}
        />
        <button disabled={!comment}>post</button>
      </div>
    </div>
  );
};

export default Post;
