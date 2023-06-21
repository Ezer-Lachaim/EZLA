import { getAll } from '../repository/user';

export interface Drive {
  id: number;
  dest: 'tel aviv';
}

export async function getDrives(): Promise<Drive[]> {
  return getAll();
}
