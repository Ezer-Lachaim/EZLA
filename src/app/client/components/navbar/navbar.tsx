'use client';

import AppBar from '@mui/material/AppBar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Props {
  title: string;
  isGoBack?: boolean;
  onClickBackIcon?: () => void;
}

export const NavBar = ({ title, isGoBack = false, onClickBackIcon = undefined }: Props) => {
  return (
    <AppBar className="p-4">
      <div className="flex items-center justify-center w-full">
        {title}
        {isGoBack && (
          <ArrowForwardIosIcon
            className="absolute right-6 cursor-pointer"
            onClick={onClickBackIcon}
          />
        )}
      </div>
    </AppBar>
  );
};
