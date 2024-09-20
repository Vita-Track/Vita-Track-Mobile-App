import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./screens/LandingScreen";
import DoctorRegistration from "./screens/Registeration/DoctorRegisteration";
import { DefaultTheme } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";

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
  return (
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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
