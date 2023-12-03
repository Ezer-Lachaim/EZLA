import parsePhoneNumber from 'libphonenumber-js';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import config from '../config';

const PHONE_NUMBER_COUNTRY = 'IL';

const client = new SNSClient({
  region: 'eu-west-2',
  credentials: {
    accessKeyId: config.sms.awsAccessKeyId,
    secretAccessKey: config.sms.awsSecretAccessKey
  }
});

export class SMSInvalidPhoneNumberError extends Error {}

export async function sendSMS(phoneNumber: string, message: string): Promise<void> {
  if (!config.sms.isOn || !phoneNumber) {
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
