import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Switch,
  TextField,
  FormControlLabel,
  Button,
  InputLabel,
  FormHelperText,
  FormControl
} from '@mui/material';
import PageHeader from '../PageHeader/PageHeader';
import { Settings } from '../../../../../api-client';
import useSettings from '../../../../../hooks/settings';
import { api } from '../../../../../services/api';

const SettingsPage = () => {
  const { settings, isLoading, setSettings } = useSettings();
  const [isUpdating, setIsUpdating] = useState(false);

  const onSubmit: SubmitHandler<Settings> = async (formData) => {
    setIsUpdating(true);

    try {
      const newSettings = {
        ...formData,
        rideTimeRestriction: Number(formData.rideTimeRestriction)
      };

      // Make API call to update settings in the backend
      await api.settings.settingsPut({ settings: newSettings });

      // Update state with the modified settings
      setSettings(newSettings);
    } catch (error) {
      console.error('Error updating settings:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader>
        <PageHeader.Title>הגדרות</PageHeader.Title>
      </PageHeader>

      <div className="flex-grow bg-white p-5 rounded-md shadow-md">
        {!isLoading && (
          <SettingsForm
            defaultSettings={settings ?? undefined}
            onSubmit={onSubmit}
            disabled={isUpdating}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsPage;

function SettingsForm({
  defaultSettings = undefined,
  onSubmit,
  disabled = false
}: {
  defaultSettings?: Settings;
  onSubmit: SubmitHandler<Settings>;
  disabled?: boolean;
}) {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Settings>({
    defaultValues: defaultSettings
  });

  return (
    <form className="flex flex-col gap-9 w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormControl>
        <InputLabel
          htmlFor="ride-time-restriction-input"
          className="static transform-none text-base pointer-events-auto text-black"
        >
          מינימום התראה בשעות
        </InputLabel>

        <TextField
          className="w-40"
          id="ride-time-restriction-input"
          required
          {...register('rideTimeRestriction', {
            required: true,
            min: 0
          })}
          type="number"
        />

        {errors.rideTimeRestriction && (
          <FormHelperText error className="mx-1">
            {errors.rideTimeRestriction.type === 'required' && 'נא להזין ערך'}
            {errors.rideTimeRestriction.type === 'min' && 'ערך לא תקין'}
          </FormHelperText>
        )}

        <FormHelperText className="mx-1">
          נוסעים לא יוכלו להזמין נסיעה במועד מוקדם ממינימום הזמן שנקבע
        </FormHelperText>
      </FormControl>

      <FormControl>
        <FormControlLabel
          required
          control={
            <Switch
              checked={watch('isRoundTripEnabled')}
              onChange={(event) => setValue('isRoundTripEnabled', event.target.checked)}
            />
          }
          label="נסיעה הלוך ושוב"
        />

        <FormHelperText className="mx-1">
          נוסעים לא יוכלו להזמין נסיעה במועד מוקדם ממינימום הזמן שנקבע
        </FormHelperText>
      </FormControl>

      <div>
        <Button variant="contained" size="large" type="submit" disabled={disabled}>
          {disabled ? 'טוען...' : 'שמירה'}
        </Button>
      </div>
    </form>
  );
}
