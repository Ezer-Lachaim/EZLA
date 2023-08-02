import withLayout from '../../components/LayoutHOC.tsx';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center">
      <h1>הגעת לעמוד לא קיים</h1>
      <p>זאת כנראה שגיאה, אנא נסו שוב מאוחר יותר</p>
    </div>
  );
};

export default withLayout(NotFound, {
  hideBackButton: true,
  showLogoutButton: true,
  title: 'עמוד לא קיים'
});
