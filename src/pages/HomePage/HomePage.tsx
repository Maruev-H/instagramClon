import React, { useEffect } from "react";
import "./HomePage.scss";
import { useAppDispatch } from "../../hooks/hooks";
import { getPosts } from "../../store/reducers/posts/postsActions";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import RecomendenForUser from "../../components/RecomendedForUser/RecomendenForUser";
import AddPosts from "../../components/NewPostForm/AddPost";
import Edit from "../../components/Edit/Edit";

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
