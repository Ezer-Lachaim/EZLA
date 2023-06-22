interface SpecialRequests {
  isWheelChair: boolean;
  isBabySafetySeat: boolean;
  isChildSafetySeat: boolean;
  isHighVehicle: boolean;
  isWheelChairTrunk: boolean;
  isPatientDelivery: boolean;
}

export interface RegistrationFormInputs {
  firstName: string;
  lastName: string;
  id: string;
  registerPhone: string;
  passengerPhone?: string;
  email: string;
  address: string;
  specialRequests: SpecialRequests;
}
