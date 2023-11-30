import { User } from '../models/user';
import client from './redis-client';

export async function createUser(uid: string, user: User) {
  return client.json.set(`user:${uid}`, '$', { ...user });
}

export async function updateUserByUid(uid: string, user: User): Promise<void> {
  const userFromDB: User = (await client.json.get(`user:${uid}`)) as unknown as User;
  const updated = Object.assign(userFromDB, user);
  await client.json.set(`user:${uid}`, '$', { ...updated });
}

export async function getUserByUid(uid: string): Promise<User> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = await client.json.get(`user:${uid}`);
  return { ...user } as User;
}

export async function getUserByEmail(email: string): Promise<User> {
  const keys = await client.keys('user:*');
  const users = []
    .concat(...(await client.json.mGet(keys, '$')))
    .filter((user) => user.email === email);
  return users[0];
}

export async function getAllUsers(state?: string, role?: string): Promise<User[]> {
  const keys = await client.keys('user:*');
  return []
    .concat(...(await client.json.mGet(keys, '$')))
    .filter((user) => !state || user.registrationState === state)
    .filter((user) => !role || user.role === role);
}

export async function updateIsInitialPass(uid: string, isInitial: boolean): Promise<void> {
  await client.json.set(`user:${uid}`, '$.isInitialPassword', isInitial);
}

export async function updateFcmToken(uid: string, fcmToken: string): Promise<void> {
  await client.json.set(`user:${uid}`, '$.fcmToken', fcmToken);
}

export async function incDriverNumOfDrives(uid: string): Promise<void> {
  await client.json.numIncrBy(`user:${uid}`, '$.numOfDrives', 1);
}
