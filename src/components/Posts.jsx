import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'
import firebaseApp from '../firebase/firebaseConfig'

const Posts = ({postList, getPosts, setEditPost}) => {
    const deletePost = async (id) => {
        const postDoc = doc(getFirestore(firebaseApp), "posts", id)
        await deleteDoc(postDoc)
        getPosts()
      }

  return (
    <>
    {postList.map(post => (
            <Card sx={{ maxWidth: 345 }} key={post.id}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="350"
                    image={post.url}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {post.Title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post.Description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => setEditPost(post)} variant="contained">
                        Edit
                    </Button>
                    <Button onClick={() => deletePost(post.id)} variant="outlined">
                        Delete
                    </Button>
                </CardActions>
            </Card>
        ))}
    </>
    );
}

export default Posts