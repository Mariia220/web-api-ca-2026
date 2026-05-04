import React, { useState, useContext } from "react";
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
import { AuthContext } from "../../contexts/authContext";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const context = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");


  const menuOptions = [
    { label: "Profile", path: "/profile"},
  ];

  if (context.isAuthenticated) {
    menuOptions.push(
    { label: "Home", path: "/home" },
    { label: "Top Rated", path: "/movies/toprated" },
    { label: "Trending Today", path: "/movies/trending" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Watch Later", path: "/movies/watchlater" },
    );
    } else {
    menuOptions.push(
      { label: "Start Page", path: "/"},
      { label: "Login", path: "/login" },
      { label: "Sign Up", path: "/signup" },
    );
  }

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
          backgroundColor: "#ffffff", // Чистий білий фон
          color: "#3f51b5",           // Яскравий синій для тексту
          boxShadow: "0px 2px 15px rgba(0,0,0,0.08)", // М'яка тінь
          borderBottom: "none" 
        }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: '800', letterSpacing: '0.5px', color: "#3f51b5" }}>
            MOVIE APP
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            sx={{
              backgroundColor: "#f5f5f5", // Світло-сірий фон для поля
              borderRadius: "12px",
              width: isMobile ? "120px" : "250px",
              mr: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "& fieldset": { border: "none" }, // Прибираємо рамку
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#3f51b5" }} />
                </InputAdornment>
              ),
            }}
          />

          {isMobile ? (
            <>
              <IconButton onClick={handleMenu} color="inherit"><MenuIcon /></IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                {menuOptions.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>{opt.label}</MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Stack direction="row" spacing={1}>
              {menuOptions.map((opt) => (
                <Button key={opt.label} sx={{ color: "#555", fontWeight: "600" }} onClick={() => handleMenuSelect(opt.path)}>
                  {opt.label}
                </Button>
              ))}
              
              {context.isAuthenticated ? (
                <Button color="error" variant="contained" disableElevation sx={{ ml: 1, borderRadius: "8px" }} onClick={() => context.signout()}>
                  Sign Out
                </Button>
              ) : (
                <Button variant="contained" sx={{ ml: 1, backgroundColor: "#3f51b5", borderRadius: "8px" }} onClick={() => navigate("/login")}>
                  Login
                </Button>
              )}
            </Stack>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
