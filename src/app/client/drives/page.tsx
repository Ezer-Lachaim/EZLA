import { getDrives } from '@/app/api/drives/route';

export default async function Page() {
  const data = await getDrives();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(data)}
    </main>
  );
}
