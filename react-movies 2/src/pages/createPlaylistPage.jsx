import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { createPlaylist, getUserPlaylists, deletePlaylist } from "../api/tmdb-api"; 
import { Link } from "react-router"; 

const CreatePlaylistPage = () => {
  const context = useContext(AuthContext);
  const [playlistName, setPlaylistName] = useState("");
  const [playlists, setPlaylists] = useState([]);

  const refreshPlaylists = async () => {
    if (context.userName) {
      try {
        const data = await getUserPlaylists(context.userName);
        setPlaylists(data || []);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    }
  };

  useEffect(() => {
    refreshPlaylists();
  }, [context.userName]);


 const handleDelete = async (playlistId) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      try {
        await deletePlaylist(context.userName, playlistId);
        alert("Playlist deleted successfully!");
        await refreshPlaylists(); 
      } catch (error) {
        console.error("Error deleting playlist:", error);
        alert("Failed to delete the playlist. Please try again.");
      }
    }
  };

  const handleCreate = async () => {
    if (!playlistName) {
        alert("Please enter a playlist name");
        return;
    }

    try {
        await createPlaylist(context.userName, playlistName);
        alert(`Playlist "${playlistName}" created successfully!`);
        setPlaylistName(""); 
        await refreshPlaylists(); 
    } catch (error) {
        console.error("Error creating playlist:", error);
        alert("Failed to create playlist. Check if your backend is running.");
    }
  };

  return (
    <div style={{ padding: "20px", color: "#333" }}>
      <h1 style={{ color: "#3f51b5", fontWeight: "800" }}>Create Custom Playlist</h1>
      <div style={{ marginBottom: "30px" }}>
        <input 
          type="text" 
          value={playlistName} 
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Playlist name..."
          style={{ 
            padding: "10px", 
            width: "300px", 
            borderRadius: "12px", 
            border: "1px solid #ddd",
            backgroundColor: "#f5f5f5",
            color: "#333",
            outline: "none"
          }}
        />
        <button 
          onClick={handleCreate}
          style={{ 
            padding: "10px 24px", 
            marginLeft: "10px", 
            cursor: "pointer", 
            backgroundColor: "#3f51b5", 
            color: "white", 
            border: "none", 
            borderRadius: "12px",
            fontWeight: "bold",
            transition: "background-color 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#2f3fa2"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#3f51b5"}
        >
          Create
        </button>
      </div>

      <hr style={{ borderColor: "#eee" }} />

      <h2 style={{ marginTop: "20px", color: "#333" }}>My Playlists</h2>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
        gap: "20px",
        marginTop: "20px" 
      }}>
        {playlists.length > 0 ? (
          playlists.map((list) => (
            <div key={list._id} style={{ 
              padding: "20px", 
              backgroundColor: "#1e1e1e", 
              borderRadius: "12px", 
              border: "none",
              position: "relative",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
              
              <button 
                onClick={() => handleDelete(list._id)}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: "transparent",
                  border: "none",
                  color: "#888",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  transition: "color 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.color = "#ff4d4d"}
                onMouseOut={(e) => e.currentTarget.style.color = "#888"}
              >
                ✕
              </button>
            
              <Link to={`/playlists/${list._id}`} style={{ textDecoration: 'none' }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#3f51b5", paddingRight: "25px", fontWeight: "700" }}>
                  {list.name} →
                </h3>
              </Link>
              <p style={{ fontSize: "0.9rem", color: "#bbb", margin: 0 }}>
                Movies count: {list.movies?.length || 0}
              </p>
            </div>
          ))
        ) : (
          <p style={{ color: "#888" }}>No playlists found.</p>
        )}
      </div>
    </div>
  );
};

export default CreatePlaylistPage;