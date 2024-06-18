type CalorieDisplayProps = {
  text: string;
  calories: number;
};

export const CalorieDisplay = ({ text, calories }: CalorieDisplayProps) => {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
      <span className="text-6xl font-black">{calories}</span>
      {text}
    </p>
  );
};
