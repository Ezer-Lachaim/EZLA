import withLayout from '../../components/LayoutHOC';
import gears from '../../../assets/gears.png';

const ProcessingUserPage = () => {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="flex flex-col items-center ">
        <img src={gears} alt="logo" className="w-60" />
        <h1 className="m-0">פרטי ההרשמה שלך נמצאים בטיפול...</h1>
        <p>ניצור איתך קשר כאשר ההרשמה תאושר</p>
      </div>
    </div>
  );
};

export default withLayout(ProcessingUserPage, {
  title: 'כניסה לשירות ההסעות',
  hideBackButton: true
});
