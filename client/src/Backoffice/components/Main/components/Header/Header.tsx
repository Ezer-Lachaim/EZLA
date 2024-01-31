'use client';

import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Logout } from '@mui/icons-material';

export default function ButtonAppBar() {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" className="bg-white drop-shadow-md" sx={{ backgroundColor: 'white' }}>
      <Toolbar>
        <img src="/logo.png" alt="logo" width="64" height="64" className="ml-6" />
        <Typography
          variant="h6"
          component="div"
          color="primary"
          className="flex-grow"
          fontSize="22px"
        >
          עזר לחיים - מערכת ניהול
        </Typography>
        {/* <Badge badgeContent={30} color="error" className="ml-6"> */}
        {/*  <Notifications color="primary" /> */}
        {/* </Badge> */}
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={() => navigate('/logout')}
        >
          <Logout color="primary" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
