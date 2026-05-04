import React, { useContext, useState } from "react"; 
import { AuthContext } from "../contexts/authContext";
import { useNavigate, Navigate } from "react-router";
import { Box, Typography, Button } from "@mui/material";

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = () => {
    if (password.length > 0 && password === passwordAgain) {
      context.register(userName, password);
      setRegistered(true);
    }
  };

  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ 
        maxWidth: 400, 
        mx: "auto", 
        mt: 10, 
        p: 4, 
        textAlign: "center", 
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)", 
        borderRadius: "20px",
        backgroundColor: "#fff" 
    }}>
        <Typography variant="h4" sx={{ color: "#3f51b5", fontWeight: "bold", mb: 2 }}>
            Sign Up
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "#777" }}>
            You must register a username and password to log in
        </Typography>
        
        <input 
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} 
            placeholder="User name" 
            onChange={e => setUserName(e.target.value)} 
        />
        <input 
            type="password" 
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} 
            placeholder="Password" 
            onChange={e => setPassword(e.target.value)} 
        />
        <input 
            type="password" 
            style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} 
            placeholder="Password again" 
            onChange={e => setPasswordAgain(e.target.value)} 
        />
        
        <Button 
            fullWidth 
            variant="contained" 
            sx={{ backgroundColor: "#3f51b5", py: 1.5, "&:hover": { backgroundColor: "#303f9f" } }} 
            onClick={register} 
        >
            Register
        </Button>

        <Typography sx={{ mt: 3 }}>
            Already have an account? <Button onClick={() => navigate("/login")} sx={{ color: "#3f51b5", textDecoration: 'none', fontWeight: 'bold', textTransform: 'none' }}>Log In!</Button>
        </Typography>
    </Box>
  );
};

export default SignUpPage;