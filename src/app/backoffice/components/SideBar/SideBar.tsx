'use client';

import { ListItemButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Chair } from '@mui/icons-material';
import Link from 'next/link';

const SideBar = () => {
  return (
    <div>
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            background: '#007DFF'
          }
        }}
      >
        <List>
          <Link href="/">
            <ListItem disablePadding>
              <ListItemButton className="text-white">
                <ListItemIcon className="text-white">
                  <Chair />
                </ListItemIcon>
                <ListItemText primary="נסיעות פעילות" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/backoffice/new-customers">
            <ListItem disablePadding>
              <ListItemButton className="text-white">
                <ListItemIcon className="text-white">
                  <Chair />
                </ListItemIcon>
                <ListItemText primary="נרשמים חדשים" />
              </ListItemButton>
            </ListItem>
          </Link>
          <ListItem disablePadding>
            <ListItemButton className="text-white">
              <ListItemIcon className="text-white">
                <Chair />
              </ListItemIcon>
              <ListItemText primary="נוסעים" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton className="text-white">
              <ListItemIcon className="text-white">
                <Chair />
              </ListItemIcon>
              <ListItemText primary="מתנדבים" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default SideBar;
