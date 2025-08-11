import { useState, useEffect } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper
} from "@mui/material";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';


function ReadBlog() {
    const {post_id} = useParams()
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await api.get(`posts/?id=${post_id}`)
                setPost(res.data)
                setComments(res.data.comments)
                
            } catch(error) {
                console.log('error in read a blog: ', error)
            }
        }

        fetchData()
    }, [post_id])

    console.log(post)

    const handleCommentSubmit = async () => {
        if (!commentText.trim()) return

        try {
            const res = await api.post('commets/', {
                post: post_id,
                content: commentText,
            })

            setComments([...comments, res.data])
            setCommentText("")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Blog Post */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(post.created_at).toLocaleString()}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ typography: "body1" }}>
            <Typography>{post.content}</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Comments ({comments.length})
        </Typography>
        <List>
          {comments.map((c, index) => (
            <ListItem key={index} sx={{ alignItems: "flex-start" }}>
                <CommentOutlinedIcon sx={{marginRight: '5px'}} />
              <ListItemText
                primary={c.author_name || ""}
                secondary={
                  <>
                    <Typography variant="body2">{c.content}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(c.created_at).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Add Comment */}
      <Box display="flex" gap={2}>
        <TextField
          label="Add a comment"
          fullWidth
          multiline
          rows={2}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          sx={{ alignSelf: "center", height: "fit-content" }}
        >
          Post
        </Button>
      </Box>
    </Container>
  );
}

export default ReadBlog;
