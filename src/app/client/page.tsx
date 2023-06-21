'use client';

import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';

export default function Home() {
  const router = useRouter();

  return <Button onClick={() => router.push('/client/drives')}>Show drives</Button>;
}
