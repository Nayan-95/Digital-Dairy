import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Avatar, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ background: "#f8f9fa", boxShadow: "none", padding: "10px 20px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Section - Logo and Menu */}
        <Box display="flex" alignItems="center">
          <Typography variant="h6" sx={{ ml: 1, color: "#6a5acd", fontWeight: "bold" }} >
            {/* <MenuIcon sx={{ color: "#6a5acd" }} /> */}
            Logo
          </Typography>
          <Typography variant="h6" sx={{ ml: 1, color: "#6a5acd", fontWeight: "bold" }}>
            Digital Dairy
          </Typography>
        </Box>

        {/* Right Section - Icons and Profile */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton>
            <SearchIcon sx={{ color: "#6a5acd" }} />
          </IconButton>
          <IconButton>
            <CalendarTodayIcon sx={{ color: "#6a5acd" }} />
          </IconButton>
          <IconButton>
            <NotificationsIcon sx={{ color: "#6a5acd" }} />
          </IconButton>
          <Avatar alt="Subhasis" src="/profile.jpg" />
          <Typography variant="body1" sx={{ color: "#333", fontWeight: "bold" }}>
            Subhasis
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
