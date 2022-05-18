import { async } from '@firebase/util'
import { addDoc, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import firebaseApp, { firebaseStorage } from '../firebase/firebaseConfig'
import Button from '@mui/material/Button'
import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const FormPost = ({postsCollection, getPosts, editPost, setEditPost, setNewPost, newPost}) => {
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
    setNewPost(!newPost)
    getPosts()
  }

  const updatePost = async(e) => {
    e.preventDefault()
    const post = doc(getFirestore(firebaseApp), "posts", editPost.id)
    await updateDoc( post, {Title: title, Description: description, url: fileUrl})
    getPosts()
    inputsCleaned()
    setEditPost(null)
    setNewPost(!newPost)
  }

  const editingPost = async(e) => {
    if (editPost) {
      setTitle(editPost.Title)
      setDescription(editPost.Description)
    }
  }

  const closeForm = () => {
    inputsCleaned()
    setEditPost(null)
    setNewPost(!newPost)
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
  
  const modalBg = {
    zIndex: "1400",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
  const modalContainer = {
    margin:"15px",

    width: "500px",
    minHeight: "100px",
    backgroundColor: "white",
    position: "relative",
    borderRadius: "5px",
    boxShadow: "rgba(100,100,111,0.2) 0px 7px 29px 0px",
    padding: "30px",
  }
  return (
    <Box sx={modalBg}>
      <Box sx={modalContainer} >
        <Box sx={{width: "100%", display: "flex", justifyContent:"end"}}>
          <IconButton onClick={() => closeForm()} aria-label="delete" size="large" color='primary'>
                    <CloseIcon />
          </IconButton>
        </Box>
        <Box component="form" onSubmit={editPost? updatePost : addPost} sx={{display:"flex", flexDirection:"column", alignItems:"center", gap:3}}>
          <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", gap:1}}>
            <Button variant="outlined" component="label">
              <input
                type="file"
                hidden
                onChange={e => setFileUpload(e.target.files[0])}
              />
              Upload Image
            </Button>
            <Typography variant="body2" color="text.secondary">{fileUpload? `${fileUpload.name}` : ""}</Typography>
          </Box>
          <TextField
            label="Title"
            variant="outlined"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            />
          <Button type='submit' variant="contained">{editPost? "Update" : "Post"}</Button>
          
        </Box>
      </Box>
    </Box>
  )
}

export default FormPost