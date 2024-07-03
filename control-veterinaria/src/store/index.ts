import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { DraftPatientT, PatientT } from "../types";

type PatientState = {
  patients: PatientT[];
  activeId: PatientT["id"];
  addPatient: (data: DraftPatientT) => void;
  deletePatient: (id: PatientT["id"]) => void;
  getPatientById: (id: PatientT["id"]) => void;
  updatePatient: (data: DraftPatientT) => void;
};

const createPatient = (patient: DraftPatientT): PatientT => {
  return { ...patient, id: uuidv4() };
};

export const usePatientStore = create<PatientState>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        activeId: "",
        addPatient: (data) => {
          const newPatient = createPatient(data);

          set((state) => ({
            patients: [...state.patients, newPatient],
          }));
          toast.success("Paciente agregado");
        },
        deletePatient: (id) => {
          set((state) => ({
            patients: state.patients.filter((patient) => patient.id !== id),
          }));
          toast.success("Paciente eliminado");
        },
        getPatientById: (id) => {
          set((state) => ({
            activeId: (state.activeId = id),
          }));
        },
        updatePatient: (data) => {
          set((state) => ({
            patients: state.patients.map((patient) =>
              patient.id === state.activeId
                ? { id: state.activeId, ...data }
                : patient
            ),
            activeId: "",
          }));
          toast.success("Paciente actualizado");
        },
      }),
      {
        name: "patients-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
