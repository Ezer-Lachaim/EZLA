import React from 'react';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { RideStateEnum, RideSpecialRequestEnum } from '../../../../../api-client';

type IconType = React.ReactElement | null;

export const RIDE_STATE_MAPPER: Record<RideStateEnum, string> = {
  [RideStateEnum.WaitingForDriver]: 'ממתין לנהג',
  [RideStateEnum.Booked]: 'שויך לנהג',
  [RideStateEnum.DriverEnroute]: 'בדרך לאיסוף',
  [RideStateEnum.DriverArrived]: 'נהג הגיע',
  [RideStateEnum.Riding]: 'בנסיעה',
  [RideStateEnum.Completed]: 'הסתיים',
  [RideStateEnum.DriverCanceled]: 'ביטול נהג',
  [RideStateEnum.RequesterCanceled]: 'ביטול נוסע',
  [RideStateEnum.Canceled]: 'בוטל'
};

export const getStateIcon = (state: RideStateEnum): IconType => {
  switch (state) {
    case RideStateEnum.WaitingForDriver:
    case RideStateEnum.Booked:
      return React.createElement(AccessTimeOutlinedIcon);
    case RideStateEnum.DriverEnroute:
    case RideStateEnum.Riding:
      return React.createElement(AirportShuttleIcon);
    case RideStateEnum.Completed:
      return React.createElement(CheckCircleOutlineOutlinedIcon);
    case RideStateEnum.RequesterCanceled:
    case RideStateEnum.DriverCanceled:
    case RideStateEnum.Canceled:
      return React.createElement(HighlightOffOutlinedIcon);
    default:
      return null;
  }
};

export const getStateIconColor = (state: RideStateEnum) => {
  switch (state) {
    case RideStateEnum.WaitingForDriver:
    case RideStateEnum.Booked:
      return '#FFB547';
    case RideStateEnum.DriverEnroute:
    case RideStateEnum.Riding:
      return '#64B6F7';
    case RideStateEnum.Completed:
      return '#7BC67E';
    case RideStateEnum.RequesterCanceled:
    case RideStateEnum.DriverCanceled:
    case RideStateEnum.Canceled:
      return '#F44336';
    default:
      return 'gray';
  }
};

export const RIDE_REQUEST: { value: RideSpecialRequestEnum; label: string }[] = [
  { value: 'WheelChair', label: 'התאמה לכסא גלגלים' },
  { value: 'BabyChair', label: 'מושב בטיחות לתינוק' },
  { value: 'KidsChair', label: 'מושב בטיחות לילדים (גיל 3-8)' },
  { value: 'AccessibleCar', label: 'רכב גבוה' },
  { value: 'WheelChairStorage', label: 'תא מטען מתאים לכסא גלגלים' },
  { value: 'PatientDelivery', label: 'משלוחים' }
];
