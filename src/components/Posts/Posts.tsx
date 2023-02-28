import React from 'react'
import { useAppSelector } from '../../hooks/hooks'
import Post from './Post'

export default function Posts() {
  
    const { posts } = useAppSelector((state) => state.posts)

  return (
    <div className="Content">
      {posts.map((item)=>(
        <Post key={item._id} {...item}/>
      ))}
    </div>
  )
}
