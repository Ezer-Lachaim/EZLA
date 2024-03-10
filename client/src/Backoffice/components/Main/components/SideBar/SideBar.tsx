import {
  ListItemButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Badge
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SettingsIcon from '@mui/icons-material/Settings';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Ride } from '../../../../../api-client';
import { api } from '../../../../../services/api';

enum TabsEnum {
  NewRegistrations = 1,
  Rides = 2,
  Passengers = 3,
  Volunteers = 4,
  Settings = 4
}

const tabs = [
  { to: '', text: 'נרשמים חדשים', id: TabsEnum.NewRegistrations, icon: <MoveToInboxIcon /> },
  { to: 'rides', text: 'נסיעות', id: TabsEnum.Rides, icon: <DirectionsCarIcon /> },
  { to: 'passengers', text: 'נוסעים', id: TabsEnum.Passengers, icon: <EmojiPeopleIcon /> },
  {
    to: 'volunteers',
    text: 'מתנדבים',
    id: TabsEnum.Volunteers,
    icon: <SupervisedUserCircleIcon />
  },
  { to: 'settings', text: 'הגדרות', id: TabsEnum.Settings, icon: <SettingsIcon /> }
];

const tabsPathMap = new Map(tabs.map((tab) => [tab.to, tab.id]));

const SideBar = () => {
  const [waitingRides, setWaitingRides] = useState<Ride[]>([]);
  const [activeTab, setActiveTab] = useState<TabsEnum | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchRides = async () => {
      const response = await api.ride.ridesGet();

      setWaitingRides(
        response.filter((ride) => ride.state === 'WaitingForDriver' || ride.state === 'Booked')
      );
    };
    fetchRides();
  }, []);

  useEffect(() => {
    const currentPath = location.pathname.split('/backoffice/')?.[1]?.split('/')?.[0] ?? '';
    const currentTab = tabsPathMap.get(currentPath);
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [location]);

  return (
    <nav className="bg-blue-600 shrink-0 w-250">
      <List>
        {tabs.map((tab) => (
          <Link to={tab.to} key={tab.id} style={{ textDecoration: 'none' }}>
            <ListItem disablePadding>
              <ListItemButton
                className={activeTab === tab.id ? 'bg-blue-600' : 'text-white'}
                style={{ backgroundColor: activeTab === tab.id ? 'white' : '' }}
              >
                <ListItemIcon className={activeTab === tab.id ? '#007DFF' : 'text-white'}>
                  {tab.icon}
                </ListItemIcon>
                <div className="flex items-center">
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 400,
                          color: activeTab === tab.id ? '#007DFF' : 'white'
                        }}
                      >
                        {tab.text}
                      </Typography>
                    }
                  />
                  {tab.id === TabsEnum.Rides && waitingRides.length ? (
                    <Badge
                      badgeContent={waitingRides.length}
                      classes={{ badge: 'bg-[#FF9800]', root: 'ms-4' }}
                    />
                  ) : null}
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
