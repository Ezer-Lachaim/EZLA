import { ReactElement } from 'react';

interface Props {
  label: string;
  value: string | ReactElement;
}

export const ViewField = ({ label, value }: Props) => {
  return (
    <div className="flex flex-col mt-2">
      <p className=" text-sm text-gray-500">{label}</p>
      {typeof value === 'string' ? <p className="text-lg">{value}</p> : value}
    </div>
  );
};
