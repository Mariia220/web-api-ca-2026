import React, { useContext, useState } from "react"; 
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AddToMustWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [open, setOpen] = useState(false); 
  const handleAddToMustWatch = (e) => {
    e.preventDefault();
    context.addToMustWatch(movie);
    setOpen(true); 
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false); 
  };

  return (
    <>
      <IconButton aria-label="add to watch later" onClick={handleAddToMustWatch}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>

      <Snackbar 
        open={open} 
        autoHideDuration={2000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
           Added to Watch Later List ✅
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToMustWatchIcon;