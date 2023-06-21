import { Metadata } from 'next';

async function getData() {
  const res = await fetch('http://localhost:3000/api/drives');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export const metadata: Metadata = {
  title: 'נוסעים',
  description: 'Ezer Lachaim'
};

export default async function Page() {
  const data = await getData();
  return <div className="flex p-24">{JSON.stringify(data)}</div>;
}
