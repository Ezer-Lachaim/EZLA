import { getAll } from '../repository/user';

export async function getDrives(): Promise<unknown[]> {
  return getAll();
}
