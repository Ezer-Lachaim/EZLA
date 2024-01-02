'use client';

import { ListItemButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { VolunteerActivism, DriveEta, PersonAdd, Accessible } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SideBar = () => {
  const [activeLink, setActiveLink] = useState('נרשמים חדשים');

  const handleClick = (path: string) => {
    setActiveLink(path);
  };

  return (
    <nav className="bg-blue-600 w-250 mt-16">
      <List>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link to="">
          <ListItem disablePadding>
            <ListItemButton
              className={activeLink === 'נרשמים חדשים' ? 'bg-blue-600' : 'text-white'}
              style={{ backgroundColor: activeLink === 'נרשמים חדשים' ? 'white' : '' }}
              onClick={() => handleClick('נרשמים חדשים')}
            >
              <ListItemIcon className={activeLink === 'נרשמים חדשים' ? '#007DFF' : 'text-white'}>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="נרשמים חדשים" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="rides">
          <ListItem disablePadding>
            <ListItemButton
              className={activeLink === 'נסיעות' ? 'bg-blue-600' : 'text-white'}
              style={{ backgroundColor: activeLink === 'נסיעות' ? 'white' : '' }}
              onClick={() => handleClick('נסיעות')}
            >
              <ListItemIcon className={activeLink === 'נסיעות' ? '#007DFF' : 'text-white'}>
                <DriveEta />
              </ListItemIcon>
              <ListItemText primary="נסיעות" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="passengers">
          <ListItem disablePadding>
            <ListItemButton
              className={activeLink === 'נוסעים' ? 'bg-blue-600' : 'text-white'}
              style={{ backgroundColor: activeLink === 'נוסעים' ? 'white' : '' }}
              onClick={() => handleClick('נוסעים')}
            >
              <ListItemIcon className={activeLink === 'נוסעים' ? '#007DFF' : 'text-white'}>
                <Accessible />
              </ListItemIcon>
              <ListItemText primary="נוסעים" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="volunteers">
          <ListItem disablePadding>
            <ListItemButton
              className={activeLink === 'מתנדבים' ? 'bg-blue-600' : 'text-white'}
              style={{ backgroundColor: activeLink === 'מתנדבים' ? 'white' : '' }}
              onClick={() => handleClick('מתנדבים')}
            >
              <ListItemIcon className={activeLink === 'מתנדבים' ? '#007DFF' : 'text-white'}>
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
