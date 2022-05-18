import { useEffect, useState } from 'react'
import './App.css'
import Posts from './components/Posts'
import {getFirestore, collection, getDoc, getDocs, doc} from 'firebase/firestore'
import firebaseApp from './firebase/firebaseConfig'
import { async } from '@firebase/util'
import FormPost from './components/FormPost'
import Navbar from './components/Navbar'
import { Button, Container } from '@mui/material'

function App() {
  const [posts, setPosts] = useState([])
  const firestore = getFirestore(firebaseApp)
  const [editPost, setEditPost] = useState(null)
  const [newPost, setNewPost] = useState(false)

  const postsCollection = collection(firestore, "posts")

  const getPosts = async () => {
    const data = await getDocs(postsCollection)
    setPosts(data.docs.map(doc => ({...doc.data(), id:doc.id})))
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className="App">
      <Navbar/>
      <Container sx={{display: "flex", flexDirection:"column", alignItems:'center', marginTop: 4}}>
      <Button variant="contained" onClick={() => setNewPost(!newPost)}>New post</Button>
        {newPost && <FormPost postsCollection={postsCollection} getPosts={getPosts} editPost={editPost} setEditPost={setEditPost} setNewPost={setNewPost} newPost={newPost}/>}
        <Posts postList={posts} getPosts={getPosts} setEditPost={setEditPost}/>
      </Container>
    </div>
  )
}

export default App
