interface Props {
  label: string;
  value: string;
}

export const ViewField = ({ label, value }: Props) => {
  return (
    <div className="flex flex-col mt-2">
      <p className=" text-sm text-gray-500">{label}</p>
      <p className="text-lg">{value}</p>
    </div>
  );
};
