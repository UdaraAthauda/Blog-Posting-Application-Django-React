import React, { useState } from 'react'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Grid, Button, Card, CardContent, Typography } from '@mui/material'
import api from '../api/api'
import { Link } from 'react-router-dom'

const Home = () => {
  const [posts, setposts] = useState([])
  const {logoutUser} = useContext(AuthContext)
 
  useEffect(() => {
    api.get('read/').then(res => setposts(res.data)).catch(err => console.log(err))
  }, [])

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Posts
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
                  component={Link}
                  to={`/posts/${post.slug}`}
                  sx={{ marginTop: 2 }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Home