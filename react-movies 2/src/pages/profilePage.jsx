import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router"; 
import { Box, Typography, Button, Paper, Container, Grid, Avatar } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MovieIcon from "@mui/icons-material/Movie";
import { AuthContext } from "../contexts/authContext";
import { MoviesContext } from "../contexts/moviesContext"; 
import { createPlaylist, getUserPlaylists, deletePlaylist } from "../api/tmdb-api"; 

const ProfilePage = () => {
    const { isAuthenticated, userName } = useContext(AuthContext);
    const { watchHistory } = useContext(MoviesContext); 
    const navigate = useNavigate();
  
    const [playlistName, setPlaylistName] = useState("");
    const [playlists, setPlaylists] = useState([]);

    const refreshPlaylists = async () => {
        if (userName) {
            try {
                const data = await getUserPlaylists(userName);
                setPlaylists(data || []);
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            refreshPlaylists();
        }
    }, [isAuthenticated, userName]);

    const handleDelete = async (playlistId) => {
        if (window.confirm("Are you sure you want to delete this playlist?")) {
            try {
                await deletePlaylist(userName, playlistId);
                alert("Playlist deleted successfully!");
                await refreshPlaylists(); 
            } catch (error) {
                console.error("Error deleting playlist:", error);
                alert("Failed to delete the playlist.");
            }
        }
    };

    const handleCreate = async () => {
        if (!playlistName) {
            alert("Please enter a playlist name");
            return;
        }
        try {
            await createPlaylist(userName, playlistName);
            alert(`Playlist "${playlistName}" created successfully!`);
            setPlaylistName(""); 
            await refreshPlaylists(); 
        } catch (error) {
            console.error("Error creating playlist:", error);
            alert("Failed to create playlist.");
        }
    };

    if (!isAuthenticated) {
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
    }

    return (
        <Container maxWidth={false} sx={{ mt: 5, mb: 5, px: { xs: 2, md: 6 } }}>
            <Grid container spacing={5}>
                
                <Grid item xs={12} md={3.5} lg={3}>
                    <Paper elevation={1} sx={{ p: 3, backgroundColor: "#f8f9fa", borderRadius: "16px", textAlign: "center", mb: 3, border: "1px solid #e8eaf6" }}>
                        <Avatar sx={{ bgcolor: "#3f51b5", width: 70, height: 70, margin: "0 auto 15px", fontSize: "1.5rem", fontWeight: "bold" }}>
                            {userName ? userName[0].toUpperCase() : "U"}
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: "700", color: "#333" }}>
                            {userName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#777", mt: 0.5 }}>
                            Movie Enthusiast
                        </Typography>
                    </Paper>

                    <Paper elevation={1} sx={{ p: 3, backgroundColor: "#f8f9fa", borderRadius: "16px", border: "1px solid #e8eaf6" }}>
                        <Typography variant="h6" sx={{ fontWeight: "700", color: "#3f51b5", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                            <MovieIcon /> Watch History
                        </Typography>
                        {watchHistory && watchHistory.length > 0 ? (
                            watchHistory.map((history, index) => (
                                <Box key={index} sx={{ pb: 1.5, mb: 1.5, borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="body2" sx={{ fontWeight: "600", color: "#444" }}>{history.title}</Typography>
                                    <Typography variant="caption" sx={{ color: "#888" }}>{history.date}</Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2" sx={{ color: "#999", textAlign: "center", py: 2 }}>No movies viewed yet.</Typography>
                        )}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={7.5} lg={7} sx={{ ml: { md: 2, lg: 4 } }}>
                    <Typography variant="h4" sx={{ fontWeight: "800", color: "#3f51b5", mb: 3 }}>
                        My Playlists ({playlists.length})
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1.5, mb: 4 }}>
                        <input 
                            type="text" 
                            value={playlistName} 
                            onChange={(e) => setPlaylistName(e.target.value)}
                            placeholder="Create new playlist..."
                            style={{ 
                                padding: "12px 16px", 
                                flexGrow: 1,
                                borderRadius: "12px", 
                                border: "1px solid #ddd",
                                backgroundColor: "#f5f5f5",
                                color: "#333",
                                outline: "none",
                                fontSize: "1rem",
                                transition: "border-color 0.2s"
                            }}
                        />
                        <Button 
                            onClick={handleCreate}
                            variant="contained"
                            sx={{ 
                                backgroundColor: "#3f51b5", 
                                color: "white", 
                                borderRadius: "12px",
                                px: 4,
                                fontWeight: "bold",
                                textTransform: "none",
                                "&:hover": { backgroundColor: "#303f9f" }
                            }}
                        >
                            Create
                        </Button>
                    </Box>

                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", 
                        gap: "20px" 
                    }}>
                        {playlists.length > 0 ? (
                            playlists.map((list) => (
                                <div key={list._id} style={{ 
                                    padding: "20px", 
                                    backgroundColor: "#f8f9fa", 
                                    borderRadius: "12px", 
                                    position: "relative",
                                    border: "1px solid #e8eaf6",
                                    boxShadow: "0 4px 12px rgba(63, 81, 181, 0.03)"
                                }}>
                                    <button 
                                        onClick={() => handleDelete(list._id)}
                                        style={{
                                            position: "absolute",
                                            top: "12px",
                                            right: "12px",
                                            background: "transparent",
                                            border: "none",
                                            color: "#bbb",
                                            cursor: "pointer",
                                            fontSize: "1rem",
                                            fontWeight: "bold",
                                            transition: "color 0.2s"
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.color = "#ff4d4d"}
                                        onMouseOut={(e) => e.currentTarget.style.color = "#bbb"}
                                    >
                                        ✕
                                    </button>
                                
                                    <Link to={`/playlists/${list._id}`} style={{ textDecoration: 'none' }}>
                                        <h3 style={{ margin: "0 0 10px 0", color: "#3f51b5", paddingRight: "25px", fontWeight: "700" }}>
                                            {list.name} →
                                        </h3>
                                    </Link>
                                    <p style={{ fontSize: "0.9rem", color: "#666", margin: 0, fontWeight: "500" }}>
                                        Movies count: {list.movies?.length || 0}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <Typography sx={{ color: "#888", gridColumn: "1/-1" }}>No playlists found. Create one above!</Typography>
                        )}
                    </div>
                </Grid>

            </Grid>
        </Container>
    );
};

export default ProfilePage;