import { useState } from 'react'
import './App.css'
import Posts from './components/Posts'
import {getFirestore} from 'firebase/firestore'
import firebaseApp from './credentials'

function App() {
  const firestore = getFirestore(firebaseApp)
  const postList = [{id:1, title: 'Mi viaje'},{id:2, title: 'Saludos'}] 

  return (
    <div className="App">
      <Posts postList={postList}/>
    </div>
  )
}

export default App
