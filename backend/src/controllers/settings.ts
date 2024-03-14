import { Request, Response } from 'express';
import {
  getSettings as dbGetSettings,
  updateSettings as dbUpdateSettings
} from '../repository/settings';
import { CustomRequest } from '../middlewares/CustomRequest';
import { UserRoleEnum } from '../models/user';

// Handler to update existing settings
export async function updateSettings(req: CustomRequest, res: Response): Promise<void> {
  // verify user is admin
  if (req.user.role !== UserRoleEnum.Admin) {
    res.status(401).send();
    return;
  }

  // Logic to update settings
  try {
    const newSettings = await dbUpdateSettings(req.body);
    res.status(200).json(newSettings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Handler to get current settings
export async function getSettings(req: Request, res: Response): Promise<void> {
  try {
    let settings = await dbGetSettings();

    // If settings not found, return default settings
    if (!settings) {
      settings = {
        isRoundTripEnabled: false,
        rideTimeRestriction: 0
      };
    }

    res.status(200).json(settings);
  } catch (error) {
    console.error('Error getting settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
