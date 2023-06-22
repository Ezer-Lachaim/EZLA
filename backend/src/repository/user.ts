import { User } from '../models/user';
import client from './redis-client';

export async function createUser(uid: string, user: User) {
  return client.json.set(`user:${uid}`, '$', { ...user });
}

export async function getUserByUid(uid: string): Promise<User> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = await client.json.get(`user:${uid}`);
  return { ...user } as User;
}

export async function updateIsInitialPass(uid: string, isInitial:boolean): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await client.json.set(`user:${uid}`, '$.isInitialPassword', isInitial);
}

export async function updateUserByUid(uid: string, user: User): Promise<void> {
  const userFromDB: any = await client.json.get(`user:${uid}`);
  const updated = Object.assign(userFromDB, user);
  await client.json.set(`user:${uid}`, '$', { ...updated });
}
