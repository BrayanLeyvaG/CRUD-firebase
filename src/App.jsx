import { useEffect, useState } from 'react'
import './App.css'
import Posts from './components/Posts'
import {getFirestore, collection, getDoc, getDocs, doc} from 'firebase/firestore'
import firebaseApp from './firebase/firebaseConfig'
import { async } from '@firebase/util'
import FormPost from './components/FormPost'
import Navbar from './components/Navbar'

function App() {
  const [posts, setPosts] = useState([])
  const firestore = getFirestore(firebaseApp)
  const [editPost, setEditPost] = useState(null)

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
      <FormPost postsCollection={postsCollection} getPosts={getPosts} editPost={editPost} setEditPost={setEditPost}/>
      <Posts postList={posts} getPosts={getPosts} setEditPost={setEditPost}/>
    </div>
  )
}

export default App
