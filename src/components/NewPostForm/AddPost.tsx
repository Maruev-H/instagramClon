import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createPost } from "../../store/reducers/user/userActions";
import "./AddPost.scss";
import { BsArrowLeft } from "react-icons/bs";
import smile from "../../pictures/PostIcons/smile.png";

const AddPosts = () => {
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    if (newDescription.length && newImage) {
      event.preventDefault();
      dispatch(
        createPost({ description: newDescription, image: image as File })
      );
      setNewDescription("");
      setImage(null);
      setNewImage(null);
    }
  };

  const { username, avatar } = useAppSelector(
    (state) => state.user.currentUser
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file) {
      const reader = new FileReader();
      setImage(file[0]);

      reader.onloadend = () => {
        setNewImage(reader.result);
      };

      reader.readAsDataURL(file[0]);
    }
  };

  return (
    <>
      <div className="AddForm" id="PopUp">
        <div className="AddForm__header">
          <h1>Создание публикации</h1>
          <a href={`${image !== null ? '#PopUp2' : '#'}`}>{`${image !== null ? 'Далее' : 'Закрыть'}`}</a>
        </div>
        <input type="file" id="input__file" onChange={handleChange} />
        <h2>Перетащите сюда фото и видео</h2>
        <label htmlFor="input__file">Выбрать на компьютере</label>
      </div>
      <div className="AddForm__discreption" id="PopUp2">
        <div className="AddForm__header">
          <div className="AddForm__headComponents">
            <a href="#PopUp">
              <BsArrowLeft />
            </a>
            <h1>Создание публикации</h1>
            <a href="#header">
              <button  className="share"  type="button" onClick={handleSubmit}>
                Поделиться
              </button>
            </a>
          </div>
        </div>
        <div className="AddForm__Wrapper">
          <div className="Image">{newImage && <img src={newImage} />}</div>
          <div className="AddForm__right">
            <div className="AddForm__user">
              <div>
                <img src={avatar} alt="" />
              </div>
              <h1>{username}</h1>
            </div>
            <textarea
              className="input_name"
              value={newDescription}
              placeholder="Добавьте подпись..."
              onChange={(event) => setNewDescription(event.target.value)}
              maxLength={2200}
            />
            <div className="AddForm__end">
              <img src={smile} />
              <span>{newDescription.length}/2,200</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPosts;
