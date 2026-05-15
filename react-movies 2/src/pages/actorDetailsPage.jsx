import React from "react";
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getActor, getActorMovieCredits } from "../api/tmdb-api"; 
import Spinner from '../components/spinner';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const ActorDetailsPage = () => {
  const { id } = useParams(); 

  const { data: actor, isPending: actorPending } = useQuery({
    queryKey: ["actor", { id: id }],
    queryFn: getActor,
  });

  const { data: credits, isPending: creditsPending } = useQuery({
    queryKey: ["actorCredits", { id: id }],
    queryFn: getActorMovieCredits,
  });

  if (actorPending) return <Spinner />;
  if (creditsPending) return <Spinner />;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, flexGrow: 1 }}>
      {actor ? (
        <Grid container spacing={4}>
          <Grid size ={{ xs: 12, sm: 5, md: 4 }}>
            <Paper elevation={12} sx={{ p: 2, borderRadius: 2 }}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={actor.name}
                style={{ width: "100%", borderRadius: "8px", transition: '0.3s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
              />
            </Paper>
          </Grid>
          <Grid size ={{ xs: 12, sm: 7, md: 8 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {actor.name}
            </Typography>

            <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mt: 3, fontStyle: 'italic' }}>
              Biography
            </Typography>

            <Typography variant="body1" color="text.primary" sx={{ mb: 4, lineHeight: 1.8 }}>
              {actor.biography || "No biography available for this actor."}
            </Typography>

            <Paper elevation={1} sx={{ p: 3, mb: 4, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'medium' }}>Personal Info</Typography>
              <Box sx={{ mt: 1 }}>
              <Typography><strong>Known for:</strong> {actor.known_for_department}</Typography>
                <Typography><strong>Birthday:</strong> {actor.birthday}</Typography>
                <Typography><strong>Place of Birth:</strong> {actor.place_of_birth}</Typography>
              </Box>
            </Paper>

            <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4, color: 'secondary.main', fontWeight: 'bold' }}>
  Films with {actor.name}
</Typography>

<Grid container spacing={3} sx={{ mt: 1 }}> {/* spacing додає відступи між картками */}
  {credits.cast && credits.cast.slice(0, 12).map((m) => (
    <Grid item xs={6} sm={4} md={1} key={m.id}> {/* md={2} зробить 6 фото в ряд, md={2.4} - 5 фото */}
      <Link to={`/movies/${m.id}`} style={{ textDecoration: 'none' }}>
        <Paper 
          elevation={2} 
          sx={{ 
            p: 1, 
            textAlign: 'center', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            height: '100%', // Однаковий розмір усіх карток у ряду
            transition: '0.3s',
            '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 } // Ефект підстрибування вгору
          }}
        >
          <img
            src={m.poster_path 
              ? `https://image.tmdb.org/t/p/w200${m.poster_path}` 
              : "https://via.placeholder.com/200x300?text=No+Poster"}
            alt={m.title}
            style={{ 
              width: '100%', 
              borderRadius: '4px', 
              aspectRatio: '2/3', // Масштабує фото правильно
              objectFit: 'cover' 
            }}
          />
          
          <Box sx={{ mt: 1 }}>
            <Typography 
              variant="caption" 
              sx={{ 
                fontWeight: 'bold', 
                color: 'text.primary', 
                lineHeight: 1.1,
                display: 'block', // Щоб назва була окремим рядком
                minHeight: '2.4em' // Резервує місце під 2 рядки тексту
              }}
            >
              {m.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', display: 'block' }}>
              {m.character ? `as ${m.character}` : ''}
            </Typography>
          </Box>
        </Paper>
      </Link>
    </Grid>
  ))}
</Grid>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h4">Actor details not found</Typography>
      )}
      </Box>
  );
};

export default ActorDetailsPage;