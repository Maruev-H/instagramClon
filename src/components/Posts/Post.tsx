import React, { useState, useRef } from "react";
import { IPosts } from "../../types/IPosts";
import "./Post.scss";
import like from "../../pictures/PostIcons/likes.png";
import likeTrue from "../../pictures/PostIcons/likeTrue.png";
import komments from "../../pictures/PostIcons/komments.png";
import share from "../../pictures/PostIcons/share.png";
import favorit from "../../pictures/PostIcons/Vector.png";
import smile from "../../pictures/PostIcons/smile.png";
import ReadMore from "../ReadMoreBtn/ReadMore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  deletePost,
  postLike,
  postUnLike,
} from "../../store/reducers/posts/postsActions";
import { editPost } from "../../store/reducers/posts/PostsSlice";

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
  const { currentUser } = useAppSelector((state) => state.user);
  const [changePost, setChangePost] = useState(false);
  const dispatch = useAppDispatch();

  const postDelete = () => {
    dispatch(deletePost(_id));
  };

  const editPosts = () => {
    dispatch(editPost(_id));
  };

  const likeOrUnlikePost = () => {
    if (likes.includes(currentUser._id)) {
      dispatch(postUnLike({ _id, userId: currentUser._id }));
    } else {
      dispatch(postLike({ _id, userId: currentUser._id }));
    }
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 3000);
  };

  const [buttonDisabled, setButtonDisabled] = useState(false);

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
            {currentUser.username === user.username && (
              <>
                <button
                  className="Post__change"
                  onClick={() => {
                    setChangePost(!changePost);
                  }}
                >
                  <div className="butt"></div>
                  <div className="butt"></div>
                  <div className="butt"></div>
                </button>
                <a href="#Edit">
                  <button
                    onClick={editPosts}
                    className={`PostChangeButton first ${
                      changePost ? "block" : "none"
                    }`}
                  >
                    Edit
                  </button>
                </a>
                <br />
                <button
                  onClick={postDelete}
                  className={`PostChangeButton second ${
                    changePost ? "block" : "none"
                  }`}
                >
                  Delete
                </button>
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
            <button onClick={likeOrUnlikePost} disabled={buttonDisabled}>
              <img
                src={`${likes.includes(currentUser._id) ? likeTrue : like}`}
                alt=""
              />
            </button>
            <button>
              <img src={komments} alt="" />
            </button>
            <button>
              <img src={share} alt="" />
            </button>
          </div>
          <button className="Post__right">
            <img src={favorit} alt="" />
          </button>
        </div>
        <div className="Post__likes">{likes.length} likes</div>
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
