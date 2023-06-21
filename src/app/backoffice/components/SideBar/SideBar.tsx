'use client';

import { ListItemButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Chair } from '@mui/icons-material';
import Link from 'next/link';

const SideBar = () => {
  return (
    <nav className="bg-blue w-250">
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
        <Link href="/backoffice/passengers">
          <ListItem disablePadding>
            <ListItemButton className="text-white">
              <ListItemIcon className="text-white">
                <Chair />
              </ListItemIcon>
              <ListItemText primary="נוסעים" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/backoffice/volunteers">
          <ListItem disablePadding>
            <ListItemButton className="text-white">
              <ListItemIcon className="text-white">
                <Chair />
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
