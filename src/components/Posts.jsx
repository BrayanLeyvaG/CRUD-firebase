import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'
import firebaseApp from '../firebase/firebaseConfig'
import { Box } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Posts = ({postList, getPosts, setEditPost}) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const deletePost = async (id) => {
        const postDoc = doc(getFirestore(firebaseApp), "posts", id)
        await deleteDoc(postDoc)
        getPosts()
      }


  return (
    <Box sx={{maxWidth: "1024px", display: "flex", flexDirection:"column", alignItems:'center', marginTop: 4}}>
      {postList.map(post => (
        <Card sx={{zIndex:"-10", boxShadow: 3, maxWidth: 450, marginBottom:3, '@media (min-width:500px)': {minWidth: 450}}} key={post.id}>
            <CardMedia
                component="img"
                alt={post.title}
                height="450"
                image={post.url}
            />
            <CardContent>
              <Box sx={{display:"flex", justifyContent:'space-between'}}>
                <Typography gutterBottom variant="h5" component="div">
                    {post.Title}
                </Typography>
                <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
              </Box>
                <Typography variant="body2" color="text.secondary">
                    {post.Description}
                </Typography>
            </CardContent>
            <CardActions sx={{display:"flex", justifyContent:'end'}}>
              <Button onClick={() => setEditPost(post)} variant="outlined">
                  Edit
              </Button>
              <IconButton onClick={() => deletePost(post.id)} aria-label="delete" size="large" color='primary'>
                <DeleteIcon />
              </IconButton>
            </CardActions>
        </Card>
      ))}
    </Box>
    );
}

export default Posts