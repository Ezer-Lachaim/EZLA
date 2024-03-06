import { useEffect, useState } from 'react';
import { Box, Switch, TextField, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { Settings as SettingsType } from './../../../../../api-client/models/Settings';
import { api } from '../../../../../services/api';

const Settings = () => {
  const [settings, setSettings] = useState<SettingsType | null>(null);

  useEffect(() => {
    // Fetch initial settings from the backend when the component mounts
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const currentSettings = await api.settings.settingsGet();
      console.log('Settings:', currentSettings);
      setSettings(currentSettings);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleRoundTripToggle = () => {
    if (settings) {
      const updatedSettings: SettingsType = {
        ...settings,
        isRoundTripEnabled: !settings.isRoundTripEnabled
      };
      updateSettings(updatedSettings);
    }
  };

  const handleInviteTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(e.target.value, 10);
    if (settings) {
      const updatedSettings: SettingsType = {
        ...settings,
        rideTimeRestriction: hours
      };
      updateSettings(updatedSettings);
    }
  };

  const updateSettings = async (updatedSettings: SettingsType) => {
    try {
      // Make API call to update settings in the backend
      await api.settings.settingsPut({ settings: updatedSettings });
      // Update state with the modified settings
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <div className="mt-20 gap-5 bg-white h-full p-5">
      <Box sx={{ fontWeight: '500', fontSize: '22px', color: '#007DFF' }}>
        הגדרות
      </Box>
      <div className="flex flex-row mt-10">
        <Typography className=" text-lg font-normal ml-10  opacity-80">
          מינימום התראה להזמנת נסיעה (שעות) <br />
          <p className=" text-base opacity-60">נוסעים לא יוכלו להזמין נסיעה במועד מוקדם מהמינימום זמן שנקבע</p>
        </Typography>

        <TextField
          className="mt-5 w-40"
          id="hours"
          style={{ backgroundColor: 'white' }}
          required
          label="מינימום התראה בשעות"
          value={settings?.rideTimeRestriction || ''}
          onChange={handleInviteTimeChange}
          type="number"
          inputProps={{ min: 0, inputMode: 'numeric' }}
          defaultValue={1}
          sx={{
            '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button':
              {
                opacity: 1
              }
          }}
        />
      </div>
      <div>
        <Typography className="text-base  opacity-80">
          <Switch checked={settings?.isRoundTripEnabled || false} onChange={handleRoundTripToggle} />
          בקשה לנסיעה הלוך ושוב
          <p className="opacity-60">הנוסע יוכל לבקש נסיעה הלוך ושוב. זוהי אינדיקציה בלבד. לא יווצרו שתי נסיעות.</p>
        </Typography>
      </div>
    </div>
  );
};

export default Settings;
