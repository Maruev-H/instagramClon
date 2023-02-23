import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { createPost } from '../../store/reducers/user/instagramActions';

const AddPosts = () => {

    const [newDescription, setNewDescription] = useState("");
    const [newImage, setImage] = useState<File | null>(null);
    const dispatch = useAppDispatch();

    const handleSubmit = (event: React.FormEvent) => {
        if(newDescription.length && newImage) {
            event.preventDefault();
            dispatch(createPost( {description: newDescription, image: newImage }));
            setNewDescription("")
            setImage(null);
        } 
      };
    
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const files = event.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
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
  </div>
  )
}

export default AddPosts;