import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");


  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Top Rated", path: "/movies/toprated" },
    { label: "Trending Today", path: "/movies/trending" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Watch Later", path: "/movies/watchlater" },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search/${searchTerm}`); 
      setSearchTerm("");
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ 
          backgroundColor: "rgba(18, 18, 18, 0.95)", 
          backdropFilter: "blur(8px)", 
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)" 
        }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: '1px' }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1, fontStyle: 'italic', opacity: 0.7 }}>
            All you ever wanted to know about Movies!
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              width: isMobile ? "120px" : "250px",
              mr: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                color: "white",
                "& fieldset": { border: "none" },
              },
              "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.5)" }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                </InputAdornment>
),
            }}
          />
            {isMobile ? (
              <>
                <IconButton onClick={handleMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Stack direction="row" spacing={1}>
              {menuOptions.map((opt) => (
                <Button key={opt.label} color="inherit" onClick={() => handleMenuSelect(opt.path)}>
                  {opt.label}
                </Button>
              ))}
            </Stack>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
