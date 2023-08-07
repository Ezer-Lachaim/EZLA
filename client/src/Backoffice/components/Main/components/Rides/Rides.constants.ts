import { RideStateEnum } from '../../../../../api-client';

export const RIDE_STATE_MAPPER: Record<RideStateEnum, string> = {
  [RideStateEnum.WaitingForDriver]: 'ממתין לנהג',
  [RideStateEnum.Booked]: 'בדרך אל הנוסע',
  [RideStateEnum.DriverArrived]: 'נהג הגיע',
  [RideStateEnum.Riding]: 'בנסיעה',
  [RideStateEnum.Completed]: 'הסתיים',
  [RideStateEnum.DriverCanceled]: 'בוטל ע"י נהג',
  [RideStateEnum.RequesterCanceled]: 'בוטל ע"י נוסע',
  [RideStateEnum.Canceled]: 'בוטל'
};
