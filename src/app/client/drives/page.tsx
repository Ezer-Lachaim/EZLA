import { getDrives } from '@/app/api/drives/route';

export default async function Page() {
  const data = await getDrives();
  return <div className="flex p-24">{JSON.stringify(data)}</div>;
}
