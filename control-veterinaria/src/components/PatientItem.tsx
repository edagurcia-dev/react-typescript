type PatientItemProps = {
  label: string;
  data: string;
};

export const PatientItem = ({ label, data }: PatientItemProps) => {
  return (
    <p className="font-bold mb-3 text-gray-700 uppercase">
      {label}: <span className="font-normal normal-case">{data}</span>
    </p>
  );
};
