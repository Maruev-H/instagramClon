import React, { useState } from "react";
import "./Edit.scss";
import { BsArrowLeft } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import smile from "../../pictures/PostIcons/smile.png";
import { editPostAction } from "../../store/reducers/posts/postsActions";

const Edit = () => {
  const dispatch = useAppDispatch();
  const { editPostId, posts } = useAppSelector((state) => state.posts);
  const post = posts.find((post) => post._id === editPostId);
  const [newDiscription, setNewDescription] = useState(post?.description || "");

  const editCompleted = (_id: string, description: string) => {
    dispatch(editPostAction({ _id, description }));
    window.location.href = "#";
  };

  return (
    <div className="Edit" id="Edit">
      <div className="AddForm__header">
        <div className="Edit__headComponents">
          <a href="#">
            <BsArrowLeft />
          </a>
          <h1>Изменение публикации</h1>

          <button
            className="share"
            type="button"
            onClick={() => {
              editCompleted(post?._id as string, newDiscription);
            }}
          >
            Поделиться
          </button>
        </div>
      </div>
      <div className="AddForm__Wrapper">
        <div className="Image">{post?.image && <img src={post.image} />}</div>
        <div className="AddForm__right">
          <div className="AddForm__user">
            <div>
              <img src={post?.user.avatar} alt="" />
            </div>
            <h1>{post?.user.username}</h1>
          </div>
          <textarea
            className="input_name"
            value={newDiscription}
            placeholder="Добавьте подпись..."
            onChange={(event) => setNewDescription(event.target.value)}
            maxLength={2200}
          />
          <div className="AddForm__end">
            <img src={smile} />
            <span>{newDiscription.length}/2,200</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;

// у меня есть кнопка
