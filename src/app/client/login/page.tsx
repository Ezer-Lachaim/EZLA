import Link from 'next/link';
import { Metadata } from 'next';
import { LoginForm } from './form';

export const metadata: Metadata = {
  title: 'כניסה למערכת'
};

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <h1>כניסה למערכת</h1>
      <LoginForm />
      <Link href="/client/forgot-pass" className="mt-5">
        שכחתי סיסמא
      </Link>
      <div className="absolute bottom-4">
        <span>אין לך חשבון?</span>
        &nbsp;
        <Link href="/client/register">להרשמה</Link>
      </div>
    </div>
  );
}
