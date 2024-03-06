import client from './redis-client';

interface Settings {
  isRoundTripEnabled: boolean;
  rideTimeRestriction: number;
}

// Method to get settings from Redis
export async function getSettings(): Promise<Settings> {
  const settingsJson: any = await client.json.get('settings');
  if (settingsJson) {
    return settingsJson;
  } else {
    // If settings not found, return default settings
    return {
      isRoundTripEnabled: false,
      rideTimeRestriction: 24
    };
  }
}

// Method to set or update settings in Redis
export async function setSettings(settings: Settings): Promise<void> {
  await client.json.set('settings:', '$', { ...settings });
}
