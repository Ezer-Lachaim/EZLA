import { RideStateEnum } from '../../../../../api-client';

export const RIDE_STATE_MAPPER: Record<RideStateEnum, string> = {
  [RideStateEnum.WaitingForDriver]: 'ממתין לנהג',
  [RideStateEnum.Booked]: 'שויך לנהג',
  [RideStateEnum.DriverEnroute]: 'בדרך לאיסוף',
  [RideStateEnum.DriverArrived]: 'נהג הגיע',
  [RideStateEnum.Riding]: 'בנסיעה',
  [RideStateEnum.Completed]: 'הסתיים',
  [RideStateEnum.DriverCanceled]: 'בוטל ע"י נהג',
  [RideStateEnum.RequesterCanceled]: 'בוטל ע"י נוסע',
  [RideStateEnum.Canceled]: 'בוטל'
};
