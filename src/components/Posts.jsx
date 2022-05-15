import React from 'react'

const Posts = ({postList}) => {
  return (
    <div>
      {postList.map(post => (
        <div id={post.id}>
          <span>{post.title}</span>
          <h3>Hola</h3>
        </div>
      ))}
    </div>
  )
}

export default Posts