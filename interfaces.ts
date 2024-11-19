interface Doctor {
  id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  specialization: string;
  qualification: string;
  experienceYears: string;
  licenseNumber: string;
  clinicLocation: string;
  associatedPatients?: Patient[];
}

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  associatedDoctors?: Doctor[];
}

interface Appointment {
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  status: string;
}

interface MedicalRecord {
  id: string;
  doc: string;
  patientId: string;
  date: string;
  fileName: string;
}
