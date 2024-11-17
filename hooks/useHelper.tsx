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

  const getFutureAppointments = (
    appointments: Appointment[],
    doctorId: string
  ) => {
    const today = new Date().toISOString().split("T")[0];
    const appointmentsToday = appointments.filter((appointment) => {
      const formatedDate = new Date(appointment.date)
        .toISOString()
        .split("T")[0];
      //   console.log(formatedDate, today);

      return formatedDate > today;
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

  const getAppointmentsByDate = (appointments: Appointment[], date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date)
        .toISOString()
        .split("T")[0];
      return appointmentDate === formattedDate;
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

  const getDoctorsByPatientId = (doctors: Doctor[], patientId: string) => {
    return doctors.filter((doctor) => {
      return doctor.associatedPatients?.find(
        (patient) => patient.id === patientId
      );
    });
  };
  const generateAppointmentId = (doctorId: string, patientId: string) => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, "0"); // Numeric day (e.g., 01)
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Numeric month (e.g., 01)
    return `AP${day}${month}${doctorId}${patientId}`;
  };

  return {
    doctorsDayAppointmentsPreview,
    getFutureAppointments,
    getAppointmentsByDate,
    findPatientFromId,
    findDoctorFromId,
    getAppointmentsByPatientId,
    getDoctorsByPatientId,
    generateAppointmentId,
  };
};

export default useHelper;
