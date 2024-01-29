import { RideStateEnum } from '../../../../../api-client';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import React from 'react';


type IconType = React.ReactElement<any, string | React.JSXElementConstructor<any>>;

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
      return null as unknown as IconType;
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
