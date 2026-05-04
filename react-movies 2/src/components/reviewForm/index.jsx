import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import React, { useState, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";


const ratings = [
  {
    value: 5,
    label: "Excellent",
  },
  {
    value: 4,
    label: "Good",
  },
  {
    value: 3,
    label: "Average",
  },
  {
    value: 2,
    label: "Poor",
  },
  {
    value: 0,
    label: "Terrible",
  },
];

const styles = {
  root: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: 2,
    },
  },
  textField: {
    width: "40ch",
  },
  submit: {
    marginRight: 2,
  },
  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
};

const ReviewForm = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [rating, setRating] = useState(3);
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate();

  
  const defaultValues = {
    author: "",
    review: "",
    agree: false,
    rating: "3",
  };
  
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(defaultValues);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

      const onSubmit = (review) => {
    review.movieId = movie.id;
    review.rating = rating;
    // console.log(review);
    context.addReview(movie, review);
    setOpen(true); // NEW
  };


    const handleSnackClose = (event) => {
    setOpen(false);
    navigate("/movies/favorites");
  };



  return (
    <Box sx={{ py: 4, px: 2, display: "flex", justifyContent: "center" }}>
      <Paper 
        elevation={4} 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          width: "100%", 
          maxWidth: "800px", 
          borderRadius: "16px",
          backgroundColor: "#ffffff" 
        }}
      >
        <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: "bold", color: "#1a1a1a" }}>
          Write a review
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}> 
            
            <Controller
              name="author"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth 
                  label="Author's name"
                  variant="outlined"
                  error={!!errors.author}
                  helperText={errors.author?.message}
                />
              )}
            />

            <Controller
              name="review"
              control={control}
              rules={{
                required: "Review cannot be empty.",
                minLength: { value: 10, message: "Review is too short" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Review text"
                  multiline
                  minRows={8}
                  variant="outlined"
                  error={!!errors.review}
                  helperText={errors.review?.message}
                />
              )}
            />

            <TextField
              id="select-rating"
              select
              label="Rating"
              value={rating}
              onChange={handleRatingChange}
              helperText="How much did you like the movie?"
              sx={{ width: { xs: "100%", sm: "200px" } }} 
            >
              {ratings.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ display: "flex", gap: 2, pt: 2, justifyContent: "flex-end" }}>
              <Button
                type="reset"
                variant="outlined"
                color="secondary"
                size="large"
                onClick={() => {
                  reset();
                  setRating(3);
                }}
                sx={{ borderRadius: "8px", px: 4 }}
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ 
                  borderRadius: "8px", 
                  px: 4,
                  boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)" 
                }}
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </form>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleSnackClose}
        >
          <MuiAlert severity="success" variant="filled" elevation={6}>
            Thank you! Your review has been submitted.
          </MuiAlert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default ReviewForm;
