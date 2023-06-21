export interface Drive {
  id: number;
  dest: 'tel aviv';
}

export async function getDrives(): Promise<Drive[]> {
  return [{ id: 1, dest: 'tel aviv' }];
}
