import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Welcome from '../pages/Welcome.js';
import Login from '../pages/Login.js';
import PatientSignUp from '../pages/PatientSignUp.js';
import GuardianSignUp from "../pages/GuardianSignUp.js";
import PatientHome from "../pages/PatientHome.js";
import PatientEditProfile from "../pages/PatientEditProfile.js";
import MyDrawer from "./Drawer.js";
import Dashbord from "../pages/Admin Dashbord/Dashbord.js";
import knowladgesharingdashbord from "../pages/KnowldgeSharing/knowladgesharingdashbord.js";
import ButtonD from "../pages/Admin Dashbord/ButtonD.js";
import DeleteContentFromKSC from "../pages/KnowldgeSharing/DeleteContentFromKSC.js";
import ForgotPassword from "../pages/ForgotPassword.js";
import ChangePassword from "../pages/ChangePassword.js";
import DoctorDashboard from "../pages/DoctorDashboard.js";
import NutritionistDashboard from "../pages/NutritionistDashboard.js";
import Guardianhome from "../pages/Guardianhome.js";
import PDash from "../screen/PDashBoard.js";
import DoctorsCard from "../screen/Doctors.js";
import NutritionistCard from "../screen/Nutritionist.js";
import Reservation from "../screen/Reservation.js";
import ProfileDoc from "../screen/ProfileDoc.js";


//create stack navigators
const Stack = createNativeStackNavigator();

const Navigation = props => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name="Login" component={Login} options={{headerShown:true}}/> */}
          {/* <Stack.Screen name="PatientSignUp" component={PatientSignUp} options={{headerShown:true}}/> */}
          <Stack.Screen name="Admin" component={Dashbord} />
          <Stack.Screen
            name="knowladgesharingdashbord"
            component={knowladgesharingdashbord}
          />
          <Stack.Screen name="deletefromksc" component={DeleteContentFromKSC} />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PatientSignUp"
            component={PatientSignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GuardianSignUp"
            component={GuardianSignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DoctorDashboard"
            component={DoctorDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NutritionistDashboard"
            component={NutritionistDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Guardianhome"
            component={Guardianhome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PatientHome"
            component={MyDrawer}
            options={{ headerShown: false }}
          />

          {/* navigation for patient dashboard */}
          <Stack.Screen
            name="PatientHomePage"
            component={PDash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DoctorAppointment"
            component={DoctorsCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NutritionistAppointment"
            component={NutritionistCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MakeReservation"
            component={Reservation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DoctorProfile"
            component={ProfileDoc}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
 export default Navigation;
