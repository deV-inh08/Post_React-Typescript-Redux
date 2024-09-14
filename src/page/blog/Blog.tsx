import React from 'react'
import CreatePost from './Components/CreatePost'
import PostList from './Components/PostList/PostList'

export default function Blog() {
  return (
        <div className='p-5'>
            <CreatePost></CreatePost>
            <PostList></PostList>
        </div>
    )
}
