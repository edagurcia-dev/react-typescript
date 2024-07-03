import { usePatientStore } from "../store";
import { PatientT } from "../types";
import { PatientItem } from "./PatientItem";

type PatientDetailsProps = {
  patient: PatientT;
};

export const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const { deletePatient, getPatientById } = usePatientStore();

  return (
    <div className="mx-5 my-5 px-5 py-5 bg-white shadow-md rounded-xl">
      <PatientItem label="ID" data={patient.id} />
      <PatientItem label="Nombre" data={patient.name} />
      <PatientItem label="Propietario" data={patient.caretaker} />
      <PatientItem label="Email" data={patient.email} />
      <PatientItem label="Fecha" data={patient.date.toString()} />
      <PatientItem label="Sintomas" data={patient.symptoms} />

      <div className="flex flex-col gap-3 lg:flex-row justify-between mt-10">
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 text-white uppercase py-2 px-10 rounded-se-lg"
          onClick={() => getPatientById(patient.id)}
        >
          Editar
        </button>

        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white uppercase py-2 px-10 rounded-se-lg"
          onClick={() => deletePatient(patient.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
