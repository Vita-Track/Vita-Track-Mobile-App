import axios from "axios";

const useApi = () => {
  const baseApi = "http://localhost:5131/api/main/";

  const registerDoctor = async (data: any) => {
    const response = await axios.post(`${baseApi}register-doctor`, data);
    // console.log(response.data?.message);

    return response;
  };

  const registerPatient = async (data: any) => {
    const response = await axios.post(`${baseApi}register-patient`, data);
    // console.log(response.data?.message);

    return response;
  };

  const loginDoctor = async (data: any) => {
    try {
      const response = await axios.post(`${baseApi}doctor-login`, data);

      return response;
    } catch (error) {
      console.error("Error logging in doctor:", error);
    }
  };
  const loginPatient = async (data: any) => {
    try {
      const response = await axios.post(`${baseApi}patient-login`, data);
      return response;
    } catch (error) {
      console.error("Error logging in patient:", error);
    }
  };

  const retrieveAllDoctors = async () => {
    try {
      const response = await axios.get(`${baseApi}all-doctors`);
      return response;
    } catch (error) {
      console.log("Something went wrong");
    }
  };
  const retrieveAllPatients = async () => {
    try {
      const response = await axios.get(`${baseApi}all-patients`);
      return response;
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const associateDoctor = async (doctorId: string, patientId: string) => {
    try {
      const response = await axios.post(`${baseApi}create-association`, {
        DoctorId: doctorId,
        PatientId: patientId,
      });
      return response;
    } catch (error) {
      console.error("Error associating doctor:", error);
    }
  };
  return {
    registerPatient,
    registerDoctor,
    loginDoctor,
    loginPatient,
    retrieveAllDoctors,
    retrieveAllPatients,
    associateDoctor,
  };
};
export default useApi;
