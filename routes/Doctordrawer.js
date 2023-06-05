import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import DoctorProfile from "../pages/DoctorProfile";
import DoctorDashboard from "../pages/DoctorDashboard";
import CustomDrawer from "./CustomDrawer";


// create drawer navigation
const Drawer = createDrawerNavigator();

const DoctorDrawer = props => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="DoctorDashboard" component={DoctorDashboard} />
      <Drawer.Screen name="DoctorProfile" component={DoctorProfile} />
    </Drawer.Navigator>
  );
};

export default DoctorDrawer;