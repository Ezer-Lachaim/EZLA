import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import withLayout from '../../components/LayoutHOC';

const ProcessingUserPage = () => {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="flex flex-col items-center">
        <SettingsSuggestIcon
          sx={{ fontSize: '10rem' }}
          color="secondary"
          className="animate-bounce"
        />
        <h1 className="m-0 text-center" style={{ color: '#007DFF' }}>
          פרטי ההרשמה שלך
          <br />
          נמצאים בטיפול...
        </h1>
        <p>ניצור איתך קשר כאשר ההרשמה תאושר</p>
      </div>
    </div>
  );
};

export default withLayout(ProcessingUserPage, {
  title: 'כניסה לשירות ההסעות'
});
