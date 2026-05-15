import React from "react";
import { useNavigate } from "react-router";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Додамо іконку для солідності

const ProfilePage = () => {
    const navigate = useNavigate();
  
    return (
        <Container maxWidth="sm">
            <Box 
                sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    mt: 10 
                }}
            >
                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: 5, 
                        textAlign: "center", 
                        borderRadius: "24px",
                        width: "100%",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e8eaf6"
                    }}
                >
                    <AccountCircleIcon sx={{ fontSize: 80, color: "#3f51b5", mb: 2 }} />
                    
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#3f51b5", mb: 2 }}>
                        Profile Access
                    </Typography>

                    <Typography variant="body1" sx={{ color: "#666", mb: 4, fontSize: "1.1rem" }}>
                        You must be logged in to view your personal profile and movie collections.
                    </Typography>

                    <Button 
                        variant="contained" 
                        size="large"
                        onClick={() => navigate('/login')}
                        sx={{ 
                            backgroundColor: "#3f51b5", 
                            px: 6, 
                            py: 1.5,
                            borderRadius: "12px",
                            fontWeight: "bold",
                            textTransform: "none",
                            fontSize: "1rem",
                            "&:hover": {
                                backgroundColor: "#303f9f"
                            }
                        }}
                    >
                        Login to Continue
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default ProfilePage;