import React, { useEffect } from "react";
import "./HomePage.scss";
import { useAppDispatch } from "../../hooks/hooks";
import Posts from "../Posts/Posts";
import Header from "../Header/Header";
import { getPosts } from "../../store/reducers/posts/postsActions";
import AddPosts from "../NewPostForm/AddPost";
import Edit from "../Edit/Edit";
import RecomendenForUser from "../RecomendedForUser/RecomendenForUser";

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="HomePage">
      <Header />
      <div className="Wrapper">
        <Posts />
        <RecomendenForUser />
      </div>
      <AddPosts />
      <Edit />
    </div>
  );
}
