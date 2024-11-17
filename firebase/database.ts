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

export { addAppointment, deleteAppointment, getAllAppointments };
