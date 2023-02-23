import React, { useEffect } from "react";
import "./HomePage.scss";
import { useAppDispatch } from "../../hooks/hooks";
import Posts from "../Posts/Posts";
import Header from "./Header/Header";
import { getPosts } from "../../store/reducers/posts/postsActions";

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      <Header />
        <Posts />
    </div>
  );
}
