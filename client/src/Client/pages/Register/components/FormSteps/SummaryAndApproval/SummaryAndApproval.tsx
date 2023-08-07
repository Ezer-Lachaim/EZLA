import { useFormContext } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import { RegistrationFormInputs } from '../../../Register.types';

export const SummaryAndApproval = () => {
  const { watch, setValue } = useFormContext<RegistrationFormInputs>();

  useFormPersist('passengerInfoForm', { watch, setValue });

  const { firstName, lastName } = watch();

  return (
    <div className="flex flex-col gap-5 flex-grow">
      <p>{`${firstName} ${lastName},`}</p>
      <p>נציגים של עזר לחיים יעיינו בפרטי ההרשמה שלך בשעות הקרובות על מנת לאשרה.</p>
      <p>האישור יגיע באמצעות הודעת SMS, אימייל או בפניה טלפונית.</p>
      <p className="self-end">
        רפואה שלמה,
        <br /> צוות עזר לחיים
      </p>
    </div>
  );
};
