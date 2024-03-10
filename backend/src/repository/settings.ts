import client from './redis-client';
import { Settings } from '../models/settings';

const SETTINGS_KEY = 'settings';

// Method to get settings from Redis
export async function getSettings(): Promise<Settings | undefined> {
  const value = (await client.json.get(SETTINGS_KEY)) as unknown;
  if (value) {
    return value as Settings;
  }

  return undefined;
}

// Method to set or update settings in Redis
export async function updateSettings(settings: Settings): Promise<Settings> {
  const dbSettings = await getSettings();

  const joinedSettings = { ...dbSettings, ...settings };
  await client.json.set(SETTINGS_KEY, '$', joinedSettings);

  return joinedSettings;
}
