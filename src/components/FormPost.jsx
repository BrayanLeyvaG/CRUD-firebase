import { async } from '@firebase/util'
import { addDoc, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import firebaseApp, { firebaseStorage } from '../firebase/firebaseConfig'
import Button from '@mui/material/Button'

const FormPost = ({postsCollection, getPosts, editPost, setEditPost}) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fileUpload, setFileUpload] = useState("")
  const [fileUrl, setFileUrl] = useState(null)

  const inputsCleaned = () => {
    setTitle("")
    setDescription("")
    
  }

  const addPost = async(e) => {
    e.preventDefault()
    await addDoc( postsCollection, {Title: title, Description: description, url: fileUrl})
    inputsCleaned()
    getPosts()
  }

  const updatePost = async(e) => {
    e.preventDefault()
    const post = doc(getFirestore(firebaseApp), "posts", editPost.id)
    await updateDoc( post, {Title: title, Description: description, url: fileUrl})
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
      if (fileUpload){
        const uploadingFile = async () => {
          const fileRef = ref(firebaseStorage, `file/${fileUpload.name}`)
          await uploadBytes(fileRef, fileUpload)
          const urlDowload = await getDownloadURL(fileRef)
          setFileUrl(urlDowload);        
        }
        uploadingFile()
      }
    }, [fileUpload])
    

  

  useEffect(() => {
    editingPost()
  }, [editPost])
  


  return (
    <form onSubmit={editPost? updatePost : addPost}>
      <input
        type="file"
        onChange={e => setFileUpload(e.target.files[0])}
      />
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