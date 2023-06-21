import '../globals.css';
import { Inter } from 'next/font/google';
import SideBar from './components/SideBar/SideBar';
import Header from './components/Header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EZLA',
  description: 'Ezer Lachaim'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="rtl">
      <body className={`${inter.className} overflow-hidden`}>
        <Header />
        <div className="flex flex-1">
          <SideBar />

          <main className="flex flex-1 flex-col min-h-screen px-5 py-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
