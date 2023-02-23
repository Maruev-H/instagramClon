import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { createPost } from "../../store/reducers/user/userActions";

const AddPosts = () => {

  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = (event: React.FormEvent) => {
    if (newDescription.length && newImage) {
      event.preventDefault();
      dispatch(createPost({ description: newDescription, image: image as File}));
      setNewDescription("");
      setImage(null);
      setNewImage(null)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file) {
      const reader = new FileReader();
      setImage(file[0])

      reader.onloadend = () => {
        setNewImage(reader.result);
      };

      reader.readAsDataURL(file[0]);
    }
  };

  return (
    <div className="addForm">
      <input
        className="input_name"
        value={newDescription}
        type="text"
        placeholder="Enter description"
        onChange={(event) => setNewDescription(event.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <button type="submit" className="" onClick={handleSubmit}>
        Добавить
      </button>
      {newImage && <img src={newImage} />}
    </div>
  );
};

export default AddPosts;

// У меня есть инпут с типом файл, как мне отобразить фото, которое было выбрано на странице? реакт

// import React, { useState } from 'react';

// const App = () => {
//   const [image, setImage] = useState(null);

//   const handleChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         setImage(reader.result);
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleChange} />

//       {image && <img src={image} alt="Selected Image" />}
//     </div>
//   );
// };
