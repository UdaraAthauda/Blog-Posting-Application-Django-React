import { useEffect, useState, useContext } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

function UserProfile() {
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    bio: "",
  });

  const { logoutUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      await api.get("update/").then((res) => {
        setFormData({
          email: res.data.email || "",
          full_name: res.data.full_name || "",
          bio: res.data.bio || "",
        });
      });
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("update/", {
        email: formData.email,
        full_name: formData.full_name,
        bio: formData.bio,
      });

      alert("successfuly updated!");
    } catch (error) {
      console.log("error in updating profile: ", error);
      alert("there is a problem in updating profile?");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your user profile?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete("update/");
      logoutUser()
      alert("how sad, good bye!");
    } catch (error) {
      console.log("error in deleting the user: ", error);
      alert("problem in deleting the user profile?");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 500,
        margin: "auto",
        padding: 3,
        mt: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Update Profile
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Full Name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />

        <Button
          type="submit"
          className="formButton"
          variant="contained"
          color="primary"
          size="large"
        >
          Edit & Save Changes
        </Button>

        <Button
          variant="outlined"
          color="error"
          size="large"
          onClick={handleDelete}
        >
          Delete your profile
        </Button>
      </Box>
    </Paper>
  );
}

export default UserProfile;
