import axios from "axios";

const useApi = () => {
  const baseApi = "http://localhost:5131/api/main/";

  const registerDoctor = async (data: any) => {
    try {
      const response = await axios.post(`${baseApi}register-doctor`, data);
      return await response.data;
    } catch (error) {
      console.error("Error registering doctor:", error);
    }
  };

  const registerPatient = async (data: any) => {
    try {
      const response = await axios.post(`${baseApi}register-patient`, data);
      return await response.data;
    } catch (error) {
      console.error("Error registering patient:", error);
    }
  };

  const loginDoctor = async (data: any) => {
    try {
      const response = await axios.post(`${baseApi}doctor-login`, data);
      console.log(response.data);

      return await response.data;
    } catch (error) {
      console.error("Error logging in doctor:", error);
    }
  };
  const loginPatient = async (data: any) => {
    try {
      const response = await axios.post(`${baseApi}patient-login`, data);
      console.log(response.data);
      return await response.data;
    } catch (error) {
      console.error("Error logging in patient:", error);
    }
  };
  return { registerPatient, registerDoctor, loginDoctor, loginPatient };
};
export default useApi;
