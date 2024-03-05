import { Request, Response } from 'express';
import { setSettings } from '../repository/settings';
import redisClient from '../repository/redis-client';


// Handler to update existing settings
export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  // Logic to update settings
  try {
    const newSettings = req.body;
    console.log('a')
    await setSettings(newSettings);
    console.log('b')
    res.status(200).json(newSettings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Handler to get current settings
export const getSettingsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const currentSettingsString = await redisClient.get('settings');
    if (currentSettingsString) {
      const currentSettings = JSON.parse(currentSettingsString);
      res.status(200).json(currentSettings);
    } else {
      res.status(404).json({ error: 'Settings not found' });
    }
  } catch (error) {
    console.error('Error getting settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

