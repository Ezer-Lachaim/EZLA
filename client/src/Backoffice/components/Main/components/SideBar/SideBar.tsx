"use client";

import {
  ListItemButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Chair } from "@mui/icons-material";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <nav className="bg-blue w-250">
      <List>
        <Link to="">
          <ListItem disablePadding>
            <ListItemButton className="text-white">
              <ListItemIcon className="text-white">
                <Chair />
              </ListItemIcon>
              <ListItemText primary="נרשמים חדשים" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="passengers">
          <ListItem disablePadding>
            <ListItemButton className="text-white">
              <ListItemIcon className="text-white">
                <Chair />
              </ListItemIcon>
              <ListItemText primary="נוסעים" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="volunteers">
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
