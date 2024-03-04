import client from './redis-client';

interface Settings {
  isRoundTripEnabled: boolean;
  inviteTimeLimit: number;
}

// Default settings
const defaultSettings: Settings = {
  isRoundTripEnabled: false,
  inviteTimeLimit: 24
};

// Method to get settings from Redis
export async function getSettings(): Promise<Settings> {
  const settingsString = await client.get('settings:');
  if (settingsString) {
    return JSON.parse(settingsString);
  } else {
    // If settings not found, return default settings
    return defaultSettings;
  }
}

// Method to set or update settings in Redis
export async function setSettings(settings: Settings): Promise<void> {
  await client.set('settings:', JSON.stringify(settings));
}
