import AppBar from '@mui/material/AppBar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  hasGoBack?: boolean;
}

export const NavBar = ({
  title,
  hasGoBack = false
}: Props) => {
  const navigate = useNavigate();

  const onClickBackIcon = () => {
    navigate(-1);
  };

  return (
    <AppBar className="p-4 static" position="static">
      <div className="flex items-center justify-center w-full">
        {title}
        {hasGoBack && (
          <ArrowForwardIosIcon
            className="absolute right-6 cursor-pointer"
            onClick={onClickBackIcon}
          />
        )}
      </div>
    </AppBar>
  );
};
