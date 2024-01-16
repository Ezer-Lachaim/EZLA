import AppBar from '@mui/material/AppBar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../services/auth/user';

export interface NavBarProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  showLogoutButton?: boolean;
}

export const NavBar = ({
  title,
  showBackButton = false,
  onBackClick = undefined,
  showLogoutButton = false
}: NavBarProps) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const onClickBackIcon = () => {
    navigate(-1);
  };

  const onClickLogout = () => {
    navigate('/logout');
  };

  return (
    <AppBar className="p-4 static z-10" position="static">
      <div className="flex items-center justify-center w-full text-xl">
        {showLogoutButton && user && (
          <LogoutIcon className="absolute left-6 cursor-pointer" onClick={onClickLogout} />
        )}
        {title}
        {(showBackButton || onBackClick) && (
          <ArrowForwardIosIcon
            className="absolute right-6 cursor-pointer"
            onClick={onBackClick || onClickBackIcon}
          />
        )}
      </div>
    </AppBar>
  );
};
