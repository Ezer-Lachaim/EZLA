import '../globals.css';
import { Inter } from 'next/font/google';
import SideBar from './components/SideBar/SideBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EZLA',
  description: 'Ezer Lachaim'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="rtl">
      <body className={inter.className}>
        <div>header</div>
        <SideBar />
        <div>{children}</div>
      </body>
    </html>
  );
}
