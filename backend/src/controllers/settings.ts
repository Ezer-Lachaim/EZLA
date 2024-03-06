import { Request, Response } from 'express';
import { getSettings, setSettings } from '../repository/settings';

// Handler to create new settings
export const createSettings = async (req: Request, res: Response): Promise<void> => {
  // Logic to create new settings, if needed
  res.status(501).json({ error: 'Not implemented' });
};

// Handler to update existing settings
export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  // Logic to update settings
  try {
    const newSettings = req.body;
    await setSettings(newSettings);
    res.status(200).json(newSettings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Handler to get current settings
export const getSettingsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const currentSettings = await getSettings();
    res.status(200).json(currentSettings);
  } catch (error) {
    console.error('Error getting settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
