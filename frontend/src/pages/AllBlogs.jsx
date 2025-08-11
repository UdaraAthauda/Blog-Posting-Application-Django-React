import { useState, useEffect } from "react";
import api from "../api/api";
import { Grid, Button, Card, CardContent, Typography } from '@mui/material'
import {Link} from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function AllBlogs(params) {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            await api.get('read/').then(res => setPost(res.data))
        } catch (error) {
            console.log('error in get all posts: ', error)
        }
    }

    fetchData()
  }, [])

  console.log(posts)

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Write your ideas <ArrowForwardIcon /> Register and Login to the Blogger!
      </Typography>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {posts.map((post) => (
          <Grid key={post.id} size={{ xs: 2, sm: 4, md: 4 }}>
            <Card style={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {post.title}
                </Typography>

                <Button
                  variant="outlined"
                  component={Link}
                  to={'/login'}
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
  );
}

export default AllBlogs;
