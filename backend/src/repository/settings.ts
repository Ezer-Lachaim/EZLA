import client from './redis-client';

interface Settings {
  isRoundTripEnabled: boolean;
  inviteTimeLimit: number;
}

// Method to get settings from Redis
export async function getSettings(): Promise<Settings> {
  const settingsString = await client.get('settings:');
  console.log(settingsString)
  if (settingsString) {
    console.log(JSON.parse(settingsString));
    return JSON.parse(settingsString);
  } else {
    // If settings not found, return default settings
    return {
      isRoundTripEnabled: false,
      inviteTimeLimit: 24
    };
  }
}

// Method to set or update settings in Redis
export async function setSettings(settings: Settings): Promise<void> {
  await client.set('settings:', JSON.stringify(settings));
}
