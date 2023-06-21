"use client";

import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AccountCircle, Notifications } from "@mui/icons-material";
import Badge from "@mui/material/Badge";

export default function ButtonAppBar() {
  return (
    <AppBar position="static" className="bg-white drop-shadow-md">
      <Toolbar>
        <img
          src="/logo.png"
          alt="logo"
          width="64"
          height="64"
          className="ml-6"
        />
        <Typography
          variant="h6"
          component="div"
          color="primary"
          className="flex-grow">
          עזר לחיים - מערכת ניהול
        </Typography>
        <Badge badgeContent={30} color="error" className="ml-6">
          <Notifications color="primary" />
        </Badge>
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <AccountCircle color="primary" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
