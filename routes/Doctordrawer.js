import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import DoctorProfile from "../pages/DoctorProfile";
import DoctorDashboard from "../pages/DoctorDashboard";
import CustomDrawer from "./CustomDrawer";
import EditPassword from "../pages/EditPassword";
import PatientEditProfile from "../pages/PatientEditProfile";

// create drawer navigation
const Drawer = createDrawerNavigator();

const DoctorDrawer = props => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="DoctorDashboard" component={DoctorDashboard} />
      <Drawer.Screen name="EditProfile" component={PatientEditProfile} />
      <Drawer.Screen name="EditPassword" component={EditPassword} />
    </Drawer.Navigator>
  );
};

export default DoctorDrawer;