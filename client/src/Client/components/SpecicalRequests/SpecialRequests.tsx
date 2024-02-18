import { Chip } from '@mui/material';
import { RideSpecialRequestEnum } from '../../../api-client';

const specialRequestsMap = {
  [RideSpecialRequestEnum.WheelChair]: 'התאמה לכסא גלגלים',
  [RideSpecialRequestEnum.WheelChairStorage]: 'תא מטען מתאים לכסא גלגלים',
  [RideSpecialRequestEnum.BabyChair]: 'מושב בטיחות לתינוק',
  [RideSpecialRequestEnum.KidsChair]: 'מושב בטיחות לילדים (3-8)',
  [RideSpecialRequestEnum.AccessibleCar]: 'רכב גבוה',
  [RideSpecialRequestEnum.Food]: 'מזון',
  [RideSpecialRequestEnum.MilitaryEquipment]: 'ציוד צבאי',
  [RideSpecialRequestEnum.MedicalEquipment]: 'ציוד רפואי',
  [RideSpecialRequestEnum.HolyItems]: 'תשמישי קדושה',
  [RideSpecialRequestEnum.LargeVolume]: 'נפח גדול',
  [RideSpecialRequestEnum.SmallVolume]: 'נפח קטן',
  [RideSpecialRequestEnum.HeavyWeight]: 'משקל כבד',
  [RideSpecialRequestEnum.Fragile]: 'שביר'
};

const getLabel = (type: RideSpecialRequestEnum): string => specialRequestsMap[type];

interface Props {
  specialRequests: RideSpecialRequestEnum[];
}

export const SpecialRequestsChips = ({ specialRequests }: Props) => {
  return (
    <div className="flex flex-wrap gap-1 mb-3">
      {Array.isArray(specialRequests) &&
        Array.from(new Set(specialRequests))?.map((req) => (
          <Chip
            key={req}
            className="ml-1 mt-1"
            label={getLabel(req)}
            variant="outlined"
            color="primary"
          />
        ))}
    </div>
  );
};
