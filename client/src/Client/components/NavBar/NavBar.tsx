import AppBar from '@mui/material/AppBar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export interface NavBarProps {
  title: string;
  hideBackButton?: boolean;
  onBackClick?: () => void;
  showLogoutButton?: boolean;
}

export const NavBar = ({
  title,
  hideBackButton = false,
  onBackClick = undefined,
  showLogoutButton = false
}: NavBarProps) => {
  const navigate = useNavigate();

  const onClickBackIcon = () => {
    navigate(-1);
  };

  const onClickLogout = () => {
    navigate('/logout');
  };

  return (
    <AppBar className="p-4 static" position="static">
      <div className="flex items-center justify-center w-full text-xl">
        {showLogoutButton && (
          <LogoutIcon className="absolute left-6 cursor-pointer" onClick={onClickLogout} />
        )}
        {title}
        {!hideBackButton && (
          <ArrowForwardIosIcon
            className="absolute right-6 cursor-pointer"
            onClick={onBackClick || onClickBackIcon}
          />
        )}
      </div>
    </AppBar>
  );
};
