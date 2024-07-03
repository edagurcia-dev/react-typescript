export type PatientT = {
  id: string;
  name: string;
  caretaker: string;
  email: string;
  date: Date;
  symptoms: string;
};

export type DraftPatientT = Omit<PatientT, "id">;
