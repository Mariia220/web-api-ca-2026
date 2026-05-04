import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/authContext";
import { Box, Typography, Paper } from "@mui/material";

const StartPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        mt: 5 
      }}
    >

      <Paper 
        elevation={0} 
        sx={{ 
          width: "80%", 
          backgroundColor: "#757575", 
          color: "white", 
          textAlign: "center", 
          py: 2, 
          mb: 3 
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
          Tasky
        </Typography>
      </Paper>

      <Typography variant="h6" sx={{ mb: 1 }}>
        Welcome to Movie App! View your <Link to="/profile">Profile</Link>.
      </Typography>

      <Typography variant="body1">
        <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to manage your movie collection!
      </Typography>
    </Box>
  );
};

export default StartPage;