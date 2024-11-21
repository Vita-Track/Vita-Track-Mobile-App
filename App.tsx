import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./screens/LandingScreen";
import DoctorRegistration from "./screens/Registeration/DoctorRegisteration";
import { DefaultTheme } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import store from "./store";
import DoctorDashboard from "./screens/Dashboard/DoctorDashboard";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PatientListScreen from "./screens/ListingScreens/PatientsListScreen";
import PatientRegisteration from "./screens/Registeration/PatientRegisteration";
import PatientDashboard from "./screens/Dashboard/PatientDashboard";
import ExploreDoctorsScreen from "./screens/ExploreDoctorsScreen/ExploreDoctorsScreen";
import DoctorDetails from "./screens/DoctorDetails/DoctorDetails";
import DoctorLogin from "./screens/Login/DoctorLogin";
import PatientLogin from "./screens/Login/PatientLogin";
import UploadHealthRecord from "./screens/HealthRecord/UploadHealthRecord";
import PatientMedicalRecordsScreen from "./screens/HealthRecord/PatientMedicalRecordsScreen";
import { LogBox } from "react-native";
import DoctorAppointmentsScreen from "./screens/AppointmentsScreen/DoctorAppointmentsScreen";
import PatientAppointmentsScreen from "./screens/AppointmentsScreen/PatientAppointmentsScreen";
import PatientDetails from "./screens/PatientDetails/PatientDetails";
import DoctorsListScreen from "./screens/ListingScreens/DoctorsListScreen";
import DoctorManage from "./screens/DoctorDetails/DoctorManage";
LogBox.ignoreAllLogs();
const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#008080", //  primary color
    accent: "#B2D8D8", // Accent color
    background: "#F0FFFF", // Background color
    surface: "#E0FFFF", // Surface color
    text: "#333333", // Text color
    disabled: "#A9A9A9", // Disabled color
    placeholder: "#B2B2B2", // Placeholder color
    error: "#FF0000", // Error color
  },
};
export default function App() {
  useEffect(() => {
    const setTestDoctorId = async () => {
      try {
        await AsyncStorage.setItem("doctorId", "1");
        await AsyncStorage.setItem("patientId", "1");
        console.log("Doctor ID set to 1 for testing.");
      } catch (error) {
        console.error("Error setting doctor ID:", error);
      }
    };

    setTestDoctorId();
  }, []);

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{
              headerStyle: {
                backgroundColor: "#008080",
              },
              headerTintColor: "#fff",
            }}
          >
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Doctor Registration"
              component={DoctorRegistration}
              options={{ headerBackAccessibilityLabel: "Back" }}
            />
            <Stack.Screen
              name="Patient Registration"
              component={PatientRegisteration}
              options={{
                headerBackAccessibilityLabel: "Back",
                title: "Patient Registration",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="doctor-login"
              component={DoctorLogin}
              options={{
                headerBackAccessibilityLabel: "Back",
                title: "Doctor Login",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="patient-login"
              component={PatientLogin}
              options={{
                headerBackAccessibilityLabel: "Back",
                title: "Patient Login",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Doctor Dashboard"
              component={DoctorDashboard}
              options={{
                headerBackAccessibilityLabel: "Back",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Patient Dashboard"
              component={PatientDashboard}
              options={{
                headerBackAccessibilityLabel: "Back",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="explore-doctors-screen"
              component={ExploreDoctorsScreen}
              options={{
                headerBackAccessibilityLabel: "Back",
                title: "Explore Doctors",
              }}
            />
            <Stack.Screen
              name="doctor-details"
              component={DoctorDetails}
              options={{
                headerBackAccessibilityLabel: "Back",
                title: "Doctor Details",
              }}
            />

            <Stack.Screen
              name="doctor-appointments-screen"
              component={DoctorAppointmentsScreen}
              options={{
                headerBackAccessibilityLabel: "Back",
                title: "Appointments",
              }}
            />
            <Stack.Screen
              name="patient-appts-screen"
              component={PatientAppointmentsScreen}
              options={{
                headerBackAccessibilityLabel: "Back",
                title: "Appointments",
              }}
            />
            <Stack.Screen
              name="patients-list-screen"
              component={PatientListScreen}
              options={{
                headerBackAccessibilityLabel: "Back",
                title: "Patients",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="doctors-list-screen"
              component={DoctorsListScreen}
              options={{
                headerBackAccessibilityLabel: "Back",
                title: "Doctors",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="patient-details-screen"
              component={PatientDetails}
              options={{
                headerBackAccessibilityLabel: "Back",
                title: "Patient Details",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="doctor-manage-screen"
              component={DoctorManage}
              options={{
                headerBackAccessibilityLabel: "Back",
                title: "Manage Doctor",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="upload-health-records"
              component={UploadHealthRecord}
              options={{
                headerBackAccessibilityLabel: "Back",
                title: "Upload Health Records",
              }}
            />
            <Stack.Screen
              name="view-health-records-screen"
              component={PatientMedicalRecordsScreen}
              options={{
                headerBackAccessibilityLabel: "Back",
                title: "Health Records",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}
