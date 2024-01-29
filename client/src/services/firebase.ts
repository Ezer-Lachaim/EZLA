import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase-config';

let initialized = false;

export function init() {
  if (initialized) return;

  initialized = true;

  initializeApp(firebaseConfig[import.meta.env.MODE].options);
}
