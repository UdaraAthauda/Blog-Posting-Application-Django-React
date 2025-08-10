import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";

function EditPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`posts/${id}/`)
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
          setStatus(res.data.status);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, [id]);

  const handleSubmit = () => {
    try {
      api.put(`posts/${id}/`, { title, content, status });
      alert("successfuly updated!");
      navigate("/posts");
    } catch (error) {
      console.log("error in edit post: ", error);
      alert("there is a problem editing the post?");
    }
  };

  return (
    <Paper sx={{ maxWidth: 600, margin: "auto", mt: 2, p: 3 }}>
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Content */}
        <TextField
          label="Content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={6}
          required
        />

        {/* Status */}
        <TextField
          select
          label="Status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="published">Published</MenuItem>
        </TextField>

        {/* Submit */}
        <Button type="submit" variant="contained" size="large">
          Edit the Post
        </Button>
      </Box>
    </Paper>
  );
}

export default EditPost;
