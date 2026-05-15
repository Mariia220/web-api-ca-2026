import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router";
import { Box, Typography, Button } from "@mui/material";

const LoginPage = () => {
    const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        context.authenticate(userName, password);
    };

    let location = useLocation();

    
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, p: 4, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", borderRadius: "20px" }}>
        <Typography variant="h4" sx={{ color: "#3f51b5", fontWeight: "bold", mb: 2 }}>Login</Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "#777" }}>You must log in to view the protected pages</Typography>
        
        <input 
            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }} 
            placeholder="User name" 
            onChange={e => setUserName(e.target.value)} 
        />
        <input 
            type="password" 
            style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd' }} 
            placeholder="Password" 
            onChange={e => setPassword(e.target.value)} 
        />
        
        <Button fullWidth variant="contained" sx={{ backgroundColor: "#3f51b5", py: 1.5 }} onClick={login}>
            Log in
        </Button>
        
        <Typography sx={{ mt: 3 }}>
            Not Registered? <Link to="/signup" style={{ color: "#3f51b5" }}>Sign Up!</Link>
        </Typography>
    </Box>
);
};

export default LoginPage;
