import { DriverCarCapabilitiesEnum } from '../../../../../api-client';

export const DRIVER_CAPABILITIES: { value: DriverCarCapabilitiesEnum; label: string }[] = [
  { value: 'WheelChair', label: 'התאמה לכסא גלגלים' },
  { value: 'BabyChair', label: 'מושב בטיחות לתינוק' },
  { value: 'KidsChair', label: 'מושב בטיחות לילדים (גיל 3-8)' },
  { value: 'AccessibleCar', label: 'רכב גבוה' },
  { value: 'WheelChairStorage', label: 'תא מטען מתאים לכסא גלגלים' },
  { value: 'PatientDelivery', label: 'משלוחים' }
];
