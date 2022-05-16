import { async } from '@firebase/util'
import { addDoc, doc, getFirestore, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import firebaseApp from '../firebase/firebaseConfig'

const FormPost = ({postsCollection, getPosts, editPost, setEditPost}) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const inputsCleaned = () => {
    setTitle("")
    setDescription("")
  }

  const addPost = async(e) => {
    e.preventDefault()
    await addDoc( postsCollection, {Title: title, Description: description})
    inputsCleaned()
    getPosts()
  }

  const updatePost = async(e) => {
    e.preventDefault()
    const post = doc(getFirestore(firebaseApp), "posts", editPost.id)
    await updateDoc( post, {Title: title, Description: description})
    getPosts()
    inputsCleaned()
    setEditPost(null)

  }

  const editingPost = async(e) => {
    if (editPost) {
      setTitle(editPost.Title)
      setDescription(editPost.Description)
      
    }
  
  }

  useEffect(() => {
    editingPost()
  }, [editPost])
  


  return (
    <form onSubmit={editPost? updatePost:addPost}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        />
      <button type='submit'>{editPost? "Update" : "Post"}</button>
    </form>
  )
}

export default FormPost