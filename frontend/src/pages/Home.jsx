import React, { useState } from 'react'
import { useEffect } from 'react'
import { Grid, Button, Card, CardContent, Typography } from '@mui/material'
import api from '../api/api'
import { Link } from 'react-router-dom'

const Home = () => {
  const [posts, setposts] = useState([])
 
  useEffect(() => {
    const fetchData = async () => {
      await api.get('read/').then(res => setposts(res.data)).catch(err => console.log(err))
    }
    
    fetchData()
  }, [])

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {posts.map(post => (
          <Grid key={post.id} size={{ xs: 2, sm: 4, md: 4 }}>
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
                  to={`/read/${post.id}`}
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