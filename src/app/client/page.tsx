'use client';

import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <Button onClick={() => router.push('/client/drives')}>Show drives</Button>
      <TextField label="שם פרטי" required />
    </div>
  );
}
