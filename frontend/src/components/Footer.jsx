import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "transparent", // Transparent footer
        color: "text.primary",
        py: 2,
        textAlign: "center",
        borderTop: "1px solid rgba(0,0,0,0.1)", // Light divider (optional)
        marginTop: '80px'
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Blogger with UD sites
      </Typography>
    </Box>
  );
};

export default Footer;
