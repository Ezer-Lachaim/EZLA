'use client';

import { ListItemButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { VolunteerActivism, DriveEta, PersonAdd, Accessible } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <nav className="bg-blue-600 w-250 mt-16">
      <List>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link to="">
          <ListItem disablePadding>
            <ListItemButton className="text-white">
              <ListItemIcon className="text-white">
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="נרשמים חדשים" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="rides">
          <ListItem disablePadding>
            <ListItemButton className="text-white">
              <ListItemIcon className="text-white">
                <DriveEta />
              </ListItemIcon>
              <ListItemText primary="נסיעות" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="passengers">
          <ListItem disablePadding>
            <ListItemButton className="text-white">
              <ListItemIcon className="text-white">
                <Accessible />
              </ListItemIcon>
              <ListItemText primary="נוסעים" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="volunteers">
          <ListItem disablePadding>
            <ListItemButton className="text-white">
              <ListItemIcon className="text-white">
                <VolunteerActivism />
              </ListItemIcon>
              <ListItemText primary="מתנדבים" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </nav>
  );
};

export default SideBar;
