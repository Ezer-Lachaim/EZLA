import {
  ListItemButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Badge
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const SideBar = () => {
  const [activeLink, setActiveLink] = useState('נרשמים חדשים');

  const handleClick = (path: string) => {
    setActiveLink(path);
  };

  const propsItem = [
    { to: '', text: 'נרשמים חדשים', id: 1 },
    { to: 'rides', text: 'נסיעות', id: 2, badgeCount: 5 }, // Set the badgeCount as needed
    { to: 'passengers', text: 'נוסעים', id: 3 },
    { to: 'volunteers', text: 'מתנדבים', id: 4 }
  ];

  return (
    <nav className="bg-blue-600 shrink-0 w-250 mt-16">
      <List>
        {propsItem.map((item) => (
          <Link to={item.to} key={item.id} style={{ textDecoration: 'none' }}>
            <ListItem disablePadding>
              <ListItemButton
                className={activeLink === item.text ? 'bg-blue-600' : 'text-white'}
                style={{ backgroundColor: activeLink === item.text ? 'white' : '' }}
                onClick={() => handleClick(item.text)}
              >
                <ListItemIcon className={activeLink === item.text ? '#007DFF' : 'text-white'}>
                  {item.text === 'נרשמים חדשים' && <MoveToInboxIcon />}
                  {item.text === 'נסיעות' && <DirectionsCarIcon />}
                  {item.text === 'נוסעים' && <EmojiPeopleIcon />}
                  {item.text === 'מתנדבים' && <SupervisedUserCircleIcon />}
                </ListItemIcon>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 400,
                          color: activeLink === item.text ? '#007DFF' : 'white'
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                  {item.text === 'נסיעות' && (
                    <Badge
                      badgeContent={item.badgeCount}
                      color="error"
                      sx={{ backgroundColor: '#FF9800', marginLeft: '16px' }}
                    />
                  )}
                </div>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </nav>
  );
};

export default SideBar;
