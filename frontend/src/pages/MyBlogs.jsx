import React, { useState } from 'react'
import { useEffect } from 'react'
import { Grid, Button, Card, CardContent, Typography } from '@mui/material'
import api from '../api/api'
import { Link } from 'react-router-dom'

const MyBlogs = () => {
  const [posts, setposts] = useState([])
 
  useEffect(() => {
    api.get('posts/').then(res => setposts(res.data)).catch(err => console.log(err))
  }, [])

  return (
    <>
      <Typography variant="h4" gutterBottom>
        My Blog Posts
      </Typography>

      <Grid container spacing={3}>
        {posts.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {post.content}
                </Typography>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/posts/${post.slug}`}
                  sx={{ marginTop: 2 }}
                >
                  Edit
                </Button>
                
                <Typography><small>status: {post.status}</small></Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default MyBlogs