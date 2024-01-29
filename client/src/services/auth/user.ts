import { create } from 'zustand';
import generator from 'generate-password-browser';
import {
  Auth,
  getAuth as firebaseGetAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  getIdToken,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  checkActionCode as firebaseCheckActionCode,
  confirmPasswordReset as firebaseConfirmPasswordReset,
  UserCredential
} from 'firebase/auth';
import { User as DbUser, RideRequester } from '../../api-client';
import { init as initFirebase } from '../firebase';
import { api } from '../api';

type DbUserStore = {
  user: DbUser | null;
  isUserInitiated: boolean;
  setUser: (user: DbUser | null) => void;
};

export const useUserStore = create<DbUserStore>((set) => ({
  user: null,
  isUserInitiated: false,
  setUser: (user) => {
    set({ user, isUserInitiated: true });
  }
}));

let initialized = false;

export function init() {
  initFirebase();

  if (initialized) return;

  initialized = true;

  const auth = firebaseGetAuth();

  // init auth emulator in dev env
  if (import.meta.env.DEV) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  }

  // init the db user once the firebase auth user is initiated
  const unsubscribe = auth.onAuthStateChanged(async () => {
    unsubscribe();
    await fetchUser();
  });
}

export function getAuth() {
  init();
  return firebaseGetAuth();
}

export async function createUser(data: RideRequester) {
  if (!data.email) {
    return null;
  }

  let firebaseUser: UserCredential | undefined;
  try {
    // new users get a random password until password creation at /create-password after approval
    const generatedPass = generator.generate({
      length: 20,
      numbers: true
    });

    firebaseUser = await createUserWithEmailAndPassword(getAuth(), data.email, generatedPass);

    // set the user data on the db
    const { user } = await api.user.createUser({
      createUserRequest: {
        user: data
      }
    });

    useUserStore.getState().setUser(user);
    return user;
  } catch (error) {
    // try to delete the created firebase user in case of an error in saving the user to the db
    if (firebaseUser) {
      try {
        await deleteUser(firebaseUser.user);
      } catch (e) {
        /* empty */
      }
    }

    throw error;
  }
}

export async function updateUserInitialPassword(email: string, password: string) {
  const { user } = useUserStore.getState();
  if (!user?.userId) {
    return null;
  }

  // update user and password in db and firebase
  await api.user.updateInitialPassword({
    userId: user?.userId || '',
    updateInitialPasswordRequest: { password }
  });
  // re-signin to refresh the firebase refreshToken
  await signIn(email, password);

  // set flag on local user once a password has been initiated
  const updatedUser = { ...user, isInitialPassword: false };
  useUserStore.getState().setUser({ ...user, isInitialPassword: false });
  return updatedUser;
}

export async function signIn(email: string, password: string) {
  await signInWithEmailAndPassword(getAuth(), email, password);
  return fetchUser();
}

export async function signOut() {
  await firebaseSignOut(getAuth());
  useUserStore.getState().setUser(null);
}

export function onStateChanged(...args: Parameters<Auth['onAuthStateChanged']>) {
  const auth = getAuth();
  return auth.onAuthStateChanged(...args);
}

export async function sendPasswordResetEmail(email: string) {
  return firebaseSendPasswordResetEmail(getAuth(), email);
}

export async function checkActionCode(oobCode: string) {
  return firebaseCheckActionCode(getAuth(), oobCode);
}

export async function confirmPasswordReset(oobCode: string, newPassword: string) {
  return firebaseConfirmPasswordReset(getAuth(), oobCode, newPassword);
}

export async function getToken() {
  const auth = getAuth();
  if (!auth.currentUser) {
    return null;
  }

  return getIdToken(auth.currentUser);
}

export async function fetchUser() {
  const { setUser } = useUserStore.getState();

  // await for token to be initiated
  const token = await getToken();

  // then set the user
  if (!token) {
    setUser(null);
    return null;
  }

  try {
    const user = await api.user.getCurrentUser();
    setUser(user);
    return user;
  } catch (e) {
    setUser(null);
    return null;
  }
}
