import { RideRequester } from '../../../api-client';

export interface RegistrationFormInputs extends RideRequester {
  isApproveTerms: boolean;
}
