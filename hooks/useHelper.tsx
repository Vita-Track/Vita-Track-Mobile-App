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

  const findPatientFromId = (patients: Patient[], patientId: string) => {
    return patients.find((patient) => patient.id === patientId);
  };

  return {
    doctorsDayAppointmentsPreview,
    getFutureAppointments,
    findPatientFromId,
  };
};

export default useHelper;
