import parsePhoneNumber from 'libphonenumber-js';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const PHONE_NUMBER_COUNTRY = 'IL';
const SMS_IS_ON = process.env.SMS_IS_ON === '1';

const client = new SNSClient({
  region: 'eu-west-2',
  credentials: {
    accessKeyId: process.env.AWS_SMS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SMS_SECRET_ACCESS_KEY
  }
});

export class SMSInvalidPhoneNumberError extends Error {}

export async function sendSMS(phoneNumber: string, message: string): Promise<void> {
  if (!SMS_IS_ON) {
    return;
  }

  const parsedPhoneNumber = parsePhoneNumber(phoneNumber, PHONE_NUMBER_COUNTRY);
  if (!parsedPhoneNumber.isValid()) {
    throw new SMSInvalidPhoneNumberError('Invalid Phone Number');
  }

  await client.send(
    new PublishCommand({
      PhoneNumber: parsedPhoneNumber.number,
      Message: message,
      MessageAttributes: {
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional'
        }
      }
      // MessageDeduplicationId: "STRING_VALUE"
    })
  );
}
