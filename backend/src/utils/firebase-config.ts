import dotenv from 'dotenv';

dotenv.config();

export const config: {
  [key: string]: {
    projectId: string;
    clientEmail: string;
  };
} = {
  production: {
    projectId: 'ezla-pickup',
    clientEmail: 'firebase-adminsdk-mkix9@ezla-pickup.iam.gserviceaccount.com'
  },
  staging: {
    projectId: 'ezla-pickup-staging',
    clientEmail: 'firebase-adminsdk-trbim@ezla-pickup-staging.iam.gserviceaccount.com'
  }
};
