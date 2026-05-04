import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/authContext";
import { Box, Typography, Button } from "@mui/material";

const StartPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box sx={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        minHeight: "70vh", 
        textAlign: "center",
        backgroundColor: "#ffffff" 
      }}
    >
      <Typography variant="h2" component="h1" sx={{ fontWeight: "900", color: "#3f51b5", mb: 2 }}>
        Movie App
      </Typography>

      <Typography variant="h5" sx={{ mb: 3, color: "#666", maxWidth: "600px" }}>
        Your ultimate destination for cinema exploration. 
        View your <Link to="/profile" style={{ color: "#3f51b5", fontWeight: "bold", textDecoration: 'none' }}>Profile</Link>.
      </Typography>

      <Typography variant="body1" sx={{ color: "#888" }}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
           <Button variant="contained" sx={{ backgroundColor: "#3f51b5", mr: 2, borderRadius: "8px" }}>
             Login
           </Button>
        </Link>
        or
        <Link to="/signup" style={{ textDecoration: 'none' }}>
           <Button variant="outlined" sx={{ color: "#3f51b5", borderColor: "#3f51b5", ml: 2, borderRadius: "8px" }}>
             Signup
           </Button>
        </Link>
      </Typography>
    </Box>
  );
};

export default StartPage;