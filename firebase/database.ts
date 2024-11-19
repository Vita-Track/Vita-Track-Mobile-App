import { ref, set, remove, get } from "firebase/database";
import { db } from "./config";

/**
 * Adds an appointment to the Firebase Realtime Database.
 * @param appointmentId The unique identifier for the appointment.
 * @param appointment The appointment data to be added.
 */
const addAppointment = async (
  appointmentId: string,
  appointment: Appointment
): Promise<void> => {
  try {
    const appointmentRef = ref(db, `appointments/${appointmentId}`);
    await set(appointmentRef, appointment);
    console.log("Appointment added successfully.");
  } catch (error) {
    console.error("Error adding appointment:", error);
    throw error;
  }
};

/**
 * Deletes an appointment from the Firebase Realtime Database.
 * @param appointmentId The unique identifier for the appointment to delete.
 */
const deleteAppointment = async (appointmentId: string): Promise<void> => {
  try {
    const appointmentRef = ref(db, `appointments/${appointmentId}`);
    await remove(appointmentRef);
    console.log("Appointment deleted successfully.");
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};

const getAllAppointments = async (): Promise<Appointment[]> => {
  try {
    const appointmentsRef = ref(db, `appointments`);
    const snapshot = await get(appointmentsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Convert the object into an array of appointments
      const appointments: Appointment[] = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      console.log("Retrieved all appointments:", appointments);
      return appointments;
    } else {
      console.log("No appointments found.");
      return [];
    }
  } catch (error) {
    console.error("Error retrieving appointments:", error);
    throw error;
  }
};
/**
 * Adds a medical record to the Firebase Realtime Database.
 * @param recordId The unique identifier for the medical record.
 * @param medicalRecord The medical record data to be added.
 */
const addMedicalRecord = async (
  recordId: string,
  medicalRecord: MedicalRecord
): Promise<void> => {
  try {
    const recordRef = ref(db, `medicalRecords/${recordId}`);
    await set(recordRef, medicalRecord);
    console.log("Medical record added successfully.");
  } catch (error) {
    console.error("Error adding medical record:", error);
    throw error;
  }
};

/**
 * Retrieves all medical records from the Firebase Realtime Database.
 * @returns A promise resolving to an array of medical records.
 */
const getAllMedicalRecords = async (): Promise<MedicalRecord[]> => {
  try {
    const recordsRef = ref(db, `medicalRecords`);
    const snapshot = await get(recordsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Convert the object into an array of medical records
      const medicalRecords: MedicalRecord[] = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      console.log("Retrieved all medical records:", medicalRecords);
      return medicalRecords;
    } else {
      console.log("No medical records found.");
      return [];
    }
  } catch (error) {
    console.error("Error retrieving medical records:", error);
    throw error;
  }
};

/**
 * Deletes a medical record from the Firebase Realtime Database.
 * @param recordId The unique identifier for the medical record to delete.
 */
const deleteMedicalRecord = async (recordId: string): Promise<void> => {
  try {
    const recordRef = ref(db, `medicalRecords/${recordId}`);
    await remove(recordRef);
    console.log("Medical record deleted successfully.");
  } catch (error) {
    console.error("Error deleting medical record:", error);
    throw error;
  }
};
/**
 * Retrieves medical records for a specific patient by their ID.
 * @param patientId The unique identifier for the patient.
 * @returns A promise resolving to an array of medical records for the patient.
 */
const getMedicalRecordsByPatientId = async (
  patientId: string
): Promise<MedicalRecord[]> => {
  try {
    const recordsRef = ref(db, `medicalRecords`);
    const snapshot = await get(recordsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Filter records that belong to the specified patient
      const medicalRecords: MedicalRecord[] = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .filter((record) => record.patientId === patientId);
      console.log(
        `Retrieved medical records for patient ${patientId}:`,
        medicalRecords
      );
      return medicalRecords;
    } else {
      console.log(`No medical records found for patient ${patientId}.`);
      return [];
    }
  } catch (error) {
    console.error(
      `Error retrieving medical records for patient ${patientId}:`,
      error
    );
    throw error;
  }
};
export {
  addAppointment,
  deleteAppointment,
  getAllAppointments,
  addMedicalRecord,
  getAllMedicalRecords,
  deleteMedicalRecord,
  getMedicalRecordsByPatientId,
};
