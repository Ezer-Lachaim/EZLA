import { Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-between mb-3.5 my-20">{children}</div>;
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography variant="h6" color="primary">
      {children}
    </Typography>
  );
};

const ActionButton = (props: Parameters<typeof Button>[0]) => {
  return <Button className="flex gap-3" variant="outlined" startIcon={<Add />} {...props} />;
};

PageHeader.Title = Title;
PageHeader.ActionButton = ActionButton;

export default PageHeader;
