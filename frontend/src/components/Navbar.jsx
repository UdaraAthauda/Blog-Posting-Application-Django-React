import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


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
            Blogger
          </Typography>

          {/* Spacer pushes the rest to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right: nav links */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button component={RouterLink} to="/posts" color="inherit">
              My Posts
            </Button>

            {user ? (
              <>
                <Button component={RouterLink} to="/create" color="inherit">
                  Create
                </Button>
                <Button color="inherit" onClick={logoutUser}>
                  Logout
                </Button>
              </>
            ) : (
              <>
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
