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

  const propsItem = [
    { to: '', text: 'נרשמים חדשים', id: 1 },
    { to: 'rides', text: 'נסיעות', id: 2 },
    { to: 'passengers', text: 'נוסעים', id: 3 },
    { to: 'volunteers', text: 'מתנדבים', id: 4 }
  ];

  return (
    <nav className="bg-blue-600 shrink-0 w-250 mt-16">
      <List>
        {propsItem.map((item) => (
          <Link to={item.to} key={item.id}>
            <ListItem disablePadding>
              <ListItemButton
                className={activeLink === item.text ? 'bg-blue-600' : 'text-white'}
                style={{ backgroundColor: activeLink === item.text ? 'white' : '' }}
                onClick={() => handleClick(item.text)}
              >
                <ListItemIcon className={activeLink === item.text ? '#007DFF' : 'text-white'}>
                  {item.text === 'נרשמים חדשים' && <PersonAdd />}
                  {item.text === 'נסיעות' && <DriveEta />}
                  {item.text === 'נוסעים' && <Accessible />}
                  {item.text === 'מתנדבים' && <VolunteerActivism />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </nav>
  );
};

export default SideBar;
