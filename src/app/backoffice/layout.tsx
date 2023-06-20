import '../globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EZLA',
  description: 'Ezer Lachaim'
};
const x = 1
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>header</div>
        <div>{children}</div>
      </body>
    </html>
  );
}
