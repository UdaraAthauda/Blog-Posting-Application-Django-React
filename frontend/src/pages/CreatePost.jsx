import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";

function CreatePost({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "draft",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
        api.post('posts/', {title:formData.title, content:formData.content, status:formData.status})
        alert('post successfuly created!')
        navigate('/posts')
    } catch(error) {
        console.log('post creating error: ', error)
        alert('there is a problem creating post?')
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, margin: "auto", mt: 2, p: 3, borderRadius: 2, }}>

      <Typography variant="h4" gutterBottom>
        Create a New Blog Post
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Title */}
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* Content */}
        <TextField
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          multiline
          rows={6}
          required
        />

        {/* Status */}
        <TextField
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="published">Published</MenuItem>
        </TextField>

        {/* Submit */}
        <Button type="submit" className='formButton' variant="contained" size="large">
          Create Post
        </Button>
      </Box>
    </Paper>
  );
}


export default CreatePost