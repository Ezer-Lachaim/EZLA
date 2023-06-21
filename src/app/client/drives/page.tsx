import { Metadata } from 'next';
import { getDrives } from '@/app/api/drives/route';

export const metadata: Metadata = {
  title: 'נוסעים',
  description: 'Ezer Lachaim'
};

export default async function Page() {
  const data = await getDrives();
  return <div className="flex p-24">{JSON.stringify(data)}</div>;
}
