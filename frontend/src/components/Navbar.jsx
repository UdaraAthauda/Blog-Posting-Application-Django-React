import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';

export default function Navbar() {
  
  const {user, logoutUser} = useContext(AuthContext); 

  return (
    <>
      <AppBar position="fixed" elevation={4} sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          {/* Left: brand / title */}
          <Typography
            component={RouterLink}
            to="/"
            variant="h6"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              mr: 2,
            }}
          >
            <CreateIcon />
            Blogger
          </Typography>

          {/* Spacer pushes the rest to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right: nav links */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            
            {user ? (
              <>
                <Button component={RouterLink} to="/" color="inherit">
                    Home
                </Button>
                <Button component={RouterLink} to="/posts" color="inherit">
                  My Blogs
                </Button>
                <Button component={RouterLink} to="/create" color="inherit">
                  Write a blog
                </Button>
                <Button component={RouterLink} to="/user" color="inherit">
                  <AccountCircleIcon />
                </Button>
                <Button color="inherit" onClick={logoutUser}>
                  <LogoutIcon />
                </Button>
              </>
            ) : (
              <>
                <Button component={RouterLink} to="/blogs" color="inherit">
                    All Posts
                </Button>
                <Button component={RouterLink} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={RouterLink} to="/register" color="inherit">
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* IMPORTANT: this empty Toolbar creates spacing equal to the AppBar height
          so the page content begins *below* the navbar instead of being covered. */}
      <Toolbar />
    </>
  );
}
