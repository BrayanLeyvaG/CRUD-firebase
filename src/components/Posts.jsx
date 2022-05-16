import { deleteDoc, doc, getFirestore } from 'firebase/firestore'
import React from 'react'
import firebaseApp from '../firebase/firebaseConfig'


const Posts = ({postList, getPosts, setEditPost}) => {

  const deletePost = async (id) => {
    const postDoc = doc(getFirestore(firebaseApp), "posts", id)
    await deleteDoc(postDoc)
    getPosts()
  }

  return (
    <div>
      {postList.map(post => (
        <div key={post.id}>
          <h3>{post.Title}</h3>
          <p>{post.Description}</p>
          <div>
            <button onClick={() => setEditPost(post)}>Edit</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Posts