'use client';

import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { AccountCircle } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function ButtonAppBar() {
  return (
    <AppBar position="static" className="bg-white drop-shadow-md">
      <Toolbar>
        <Image src="/logo.png" alt="logo" width="64" height="64" className="ml-6" />
        <Typography variant="h6" component="div" color="primary" className="flex-grow">
          עזר לחיים - מערכת ניהול
        </Typography>
        <Badge badgeContent={30} color="error" className="ml-6">
          <NotificationsIcon color="primary" />
        </Badge>
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle color="primary" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
