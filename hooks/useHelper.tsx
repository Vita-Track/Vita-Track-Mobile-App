const useHelper = () => {
  const doctorsDayAppointmentsPreview = (
    appointments: Appointment[],
    doctorId: string
  ) => {
    const today = new Date().toISOString().split("T")[0];
    const appointmentsToday = appointments.filter((appointment) => {
      const formatedDate = new Date(appointment.date)
        .toISOString()
        .split("T")[0];
      //   console.log(formatedDate, today);

      return formatedDate === today;
    });
    // console.log(appointmentsToday);

    const appointmentsTodayForDoctor = appointmentsToday.filter(
      (appointment) => appointment.doctorId === doctorId
    );
    console.log(appointmentsTodayForDoctor);
    if (appointmentsTodayForDoctor.length === 0) return [];

    const appointmentsTodayForDoctorPreview = appointmentsTodayForDoctor;
    return appointmentsTodayForDoctorPreview;
  };

  const getFutureAppointments = (appointments: Appointment[], date: Date) => {
    return appointments.filter((appointment) => {
      return appointment.date > date.toISOString().split("T")[0];
    });
    // console.log(appointmentsToday);
  };

  const getAppointmentsByDate = (appointments: Appointment[], date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];

    return appointments.filter((appointment) => {
      return appointment.date === formattedDate;
    });
  };
  const findPatientFromId = (patients: Patient[], patientId: string) => {
    return patients.find((patient) => patient.id === patientId);
  };
  const findDoctorFromId = (doctors: Doctor[], doctorId: string) => {
    return doctors.find((doctor) => doctor.id === doctorId);
  };

  const getAppointmentsByPatientId = (
    appointments: Appointment[],
    patientId: string
  ) => {
    return appointments.filter(
      (appointment) => appointment.patientId === patientId
    );
  };

  const getAppointmentsByDoctorId = (
    appointments: Appointment[],
    doctorId: string
  ) => {
    return appointments.filter(
      (appointment) => appointment.doctorId === doctorId
    );
  };

  const getDoctorsByPatientId = (doctors: Doctor[], patientId: string) => {
    return doctors.filter((doctor) => {
      return doctor.associatedPatients?.find(
        (patient) => patient.id === patientId
      );
    });
  };

  const getPatientsByDoctorId = (patients: Patient[], doctorId: string) => {
    return patients.filter((patient) => {
      return patient.associatedDoctors?.find(
        (doctor) => doctor.id === doctorId
      );
    });
  };
  const generateAppointmentId = (
    doctorId: string,
    patientId: string,
    time: string
  ) => {
    const randomCode = Math.random().toString(36).substring(2, 6);
    const now = new Date();
    const day = now.getDate().toString().padStart(2, "0"); // Numeric day (e.g., 01)
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Numeric month (e.g., 01)
    return `AP${randomCode}${day}${month}${time}${doctorId}${patientId}`;
  };

  const conflictChecker = (
    appointments: Appointment[],
    date: string,
    time: string,
    doctorId: string
  ): boolean => {
    const formattedDate = new Date(date).toISOString().split("T")[0];

    // Check for conflicting appointment
    const hasConflict = appointments.some(
      (appointment) =>
        appointment.doctorId === doctorId &&
        appointment.date === formattedDate &&
        appointment.time === time
    );

    return hasConflict;
  };

  return {
    doctorsDayAppointmentsPreview,
    getFutureAppointments,
    getAppointmentsByDate,
    findPatientFromId,
    findDoctorFromId,
    getAppointmentsByPatientId,
    getDoctorsByPatientId,
    getPatientsByDoctorId,
    getAppointmentsByDoctorId,
    generateAppointmentId,
    conflictChecker,
  };
};

export default useHelper;
