import { useAuthState as firebaseUseAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '../services/firebase';

export function useAuthState() {
  return firebaseUseAuthState(getAuth());
}
