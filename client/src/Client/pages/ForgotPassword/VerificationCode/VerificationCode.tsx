import VerificationInput from 'react-verification-input';
import withLayout from '../../../components/LayoutHOC.tsx';

const VerificationCode = () => {
  let email = '';
  const urlParams = new URLSearchParams(window.location.search);
  email = urlParams.get('email') || 'my_mail@mama.cita'; // remove the default value
  if (!email) {
    window.location.href = '/client/forgot-password';
  }

  return (
    <>
      <h1>שלחנו קוד אימות לאימייל שלך</h1>
      <h1>{email}</h1>
      <p>יש להזין את 4 הספרות של קוד האימות</p>
      <div dir="ltr">
        <VerificationInput length={4} placeholder="" onChange={(code) => console.log(code)} />
      </div>
      <p>
        לא קבלתם קוד אימות ? <a href="/forgot-password">לחצו כאן</a>
      </p>
    </>
  );
};

export default withLayout(VerificationCode, { title: 'קוד אימות', showBackButton: true });
