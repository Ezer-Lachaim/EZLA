import '../globals.css';
import { Inter } from 'next/font/google';
import { NavBar } from './components/navbar/navbar';
import { RootContainer } from './components/navbar/rootContainer/rootContainer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EZLA',
  description: 'Ezer Lachaim'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="rtl">
      <body className={inter.className} suppressHydrationWarning>
        <RootContainer>
          <NavBar title="הרשמה לשירות הסעות" isGoBack />
          <main className="mt-20 flex items-center flex-col">
            <div>header</div>
            {children}
          </main>
        </RootContainer>
      </body>
    </html>
  );
}
