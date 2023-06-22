import { Box } from '@mui/material';
import withLayout from '../../components/LayoutHOC';
import gears from '../../../assets/gears.png';

const ProcessingUserPage = () => {
  return (
    <div>
      <Box>
        <img src={gears} alt="logo" className="mb-2.5" />
      </Box>
    </div>
  );
};

export default withLayout(ProcessingUserPage, { title: 'כניסה לשירות ההסעות' });
