import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Switch,
  FormControlLabel,
  Button,
  InputLabel,
  FormHelperText,
  FormControl,
  Select,
  MenuItem,
  Typography,
  TextField
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PageHeader from '../PageHeader/PageHeader';
import { Settings } from '../../../../../api-client';
import useSettings from '../../../../../hooks/settings';
import { api } from '../../../../../services/api';
import { getMenuHoursLabel } from '../../../../../utils/datetime';

const menuHours = [6, 12, 18, 24];
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

const genericSpecialRequest = ({ text, onDelete }: { text: string; onDelete: () => void }) => (
  <div className="flex flex-row justify-between w-[31.25rem]">
    <Typography className="text-lg">{text}</Typography>
    <span>
      <ArrowDropUpIcon />
      <ArrowDropDownIcon />
      <DeleteForeverIcon onClick={onDelete} />
    </span>
  </div>
);

function SettingsForm({
  defaultSettings = undefined,
  onSubmit,
  disabled = false
}: {
  defaultSettings?: Settings;
  onSubmit: SubmitHandler<Settings>;
  disabled?: boolean;
}) {
  const { watch, handleSubmit, setValue } = useForm<Settings>({
    defaultValues: defaultSettings
  });

  // State variables for special requests
  const [ridesSpecialRequests, setRidesSpecialRequests] = useState<string[]>([
    'התאמה לכסא גלגלים',
    'מושב בטיחות לתינוק'
  ]);
  const [deliversSpecialRequests, setDeliversSpecialRequests] = useState<string[]>([
    'משלוח מזון',
    'ציוד רפואי'
  ]);
  const [rideSpecialRequest, setRideSpecialRequest] = useState<string>('');
  const [deliverySpecialRequest, setDeliverySpecialRequest] = useState<string>('');

  const handleAddRideSpecialRequest = () => {
    setRidesSpecialRequests((prevRequests) => [...prevRequests, rideSpecialRequest]);
    setRideSpecialRequest(''); // Clear the input after adding
  };

  const handleAddDeliverySpecialRequest = () => {
    setDeliversSpecialRequests((prevRequests) => [...prevRequests, deliverySpecialRequest]);
    setDeliverySpecialRequest(''); // Clear the input after adding
  };

  const handleDeleteRideSpecialRequest = (index: number) => {
    const updatedRequests = [...ridesSpecialRequests];
    updatedRequests.splice(index, 1);
    setRidesSpecialRequests(updatedRequests);
  };

  const handleDeleteDeliverySpecialRequest = (index: number) => {
    const updatedRequests = [...deliversSpecialRequests];
    updatedRequests.splice(index, 1);
    setDeliversSpecialRequests(updatedRequests);
  };

  return (
    <form className="flex flex-col gap-9 w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-row">
        <Typography className="text-lg font-normal me-1 w-[31.25rem] opacity-80 mx-1">
          מינימום התראה להזמנת נסיעה (שעות) <br />
          <p className=" text-base opacity-60">
            נוסעים לא יוכלו להזמין נסיעה במועד מוקדם מהמינימום זמן שנקבע
          </p>
        </Typography>

        <FormControl>
          <InputLabel id="ride-time-restriction-input" required>
            מינימום התראה בשעות
          </InputLabel>
          <Select
            labelId="ride-time-restriction-input"
            aria-labelledby="ride-time-restriction-input"
            id="ride-time-restriction-input"
            className="w-44 h-14"
            value={watch('rideTimeRestriction')}
            onChange={(e) => setValue('rideTimeRestriction', e.target.value as number)}
            label="מינימום התראה בשעות"
            required
          >
            {menuHours.map((hour) => (
              <MenuItem key={hour} value={hour}>
                {getMenuHoursLabel(hour)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <FormControl className=" w-[31.25rem]">
        <FormControlLabel
          className="text-lg font-normal"
          control={
            <Switch
              checked={watch('isRoundTripEnabled')}
              onChange={(event) => setValue('isRoundTripEnabled', event.target.checked)}
            />
          }
          label={<span className="text-lg font-normal">בקשה לנסיעה הלוך ושוב</span>}
        />

        <FormHelperText className="mx-1 font-normal text-base">
          הנוסע יוכל לבקש נסיעה הלוך ושוב, האופציה תתווסף לבקשות מיוחדות. זוהי אינדיקציה בלבד. לא
          יתווספו שתי נסיעות.
        </FormHelperText>
      </FormControl>
      <div>
        {/* Special requests for rides */}
        <Typography className="text-base font-normal gap-1 opacity-60">
          בקשות מיוחדות עבור נסיעה (בחרו עד 6 אפשרויות)
        </Typography>
        <TextField
          className="w-[24.625rem] my-2"
          id="ride-special-request"
          label="בקשה מיוחדת חדשה"
          placeholder="כתבו בקשה מיוחדת עבור נסיעה"
          variant="outlined"
          value={rideSpecialRequest}
          onChange={(e) => setRideSpecialRequest(e.target.value)}
        />
        <Button
          className="my-3 mx-2"
          variant="text"
          startIcon={<AddIcon />}
          onClick={handleAddRideSpecialRequest}
        >
          הוספה
        </Button>
        <ul>
          {ridesSpecialRequests.map((request, index) => (
            <li key={index}>
              {genericSpecialRequest({
                text: request,
                onDelete: () => handleDeleteRideSpecialRequest(index)
              })}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {/* Special requests for deliveries */}
        <Typography className="text-base font-normal gap-1 opacity-60">
          בקשות מיוחדות עבור משלוח (בחרו עד 6 אפשרויות)
        </Typography>
        <TextField
          className="w-[24.625rem] my-2"
          id="delivery-special-request"
          label="בקשה מיוחדת חדשה"
          placeholder="כתבו בקשה מיוחדת עבור משלוח"
          variant="outlined"
          value={deliverySpecialRequest}
          onChange={(e) => setDeliverySpecialRequest(e.target.value)}
        />
        <Button
          className="my-3 mx-2"
          variant="text"
          startIcon={<AddIcon />}
          onClick={handleAddDeliverySpecialRequest}
        >
          הוספה
        </Button>
        <ul className="my-1">
          {deliversSpecialRequests.map((request, index) => (
            <li key={index}>
              {genericSpecialRequest({
                text: request,
                onDelete: () => handleDeleteDeliverySpecialRequest(index)
              })}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Button
          className="text-base font-medium"
          variant="contained"
          size="large"
          type="submit"
          disabled={disabled}
          startIcon={<SaveIcon />}
        >
          {disabled ? 'טוען...' : 'שמירה'}
        </Button>
      </div>
    </form>
  );
}
