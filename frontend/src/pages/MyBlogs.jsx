import React, { useState } from "react";
import { useEffect } from "react";
import { Grid, Button, Card, CardContent, Typography } from "@mui/material";
import api from "../api/api";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("posts/")
        .then((res) => setposts(res.data))
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`posts/${id}/`);
    } catch (error) {
      console.log("error in deleting the post: ", error);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        My Blog Posts
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
                <Typography variant="body2" color="text.secondary" noWrap>
                  {post.content}
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/posts/${post.id}`}
                  sx={{ marginTop: 2 }}
                >
                  Edit
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(post.id)}
                  sx={{ marginTop: 2, marginLeft: 1 }}
                >
                  Delete
                </Button>

                <Typography>
                  <small>status: {post.status}</small>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MyBlogs;
