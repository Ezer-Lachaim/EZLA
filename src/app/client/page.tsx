'use client';

import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={() => router.push('/client/drives')}>Show drives</Button>
    </main>
  );
}
