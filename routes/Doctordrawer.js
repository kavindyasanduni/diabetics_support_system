import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import DoctorProfile from "../pages/DoctorProfile";
import DoctorDashboard from "../pages/DoctorDashboard";
import CustomDrawer from "./CustomDrawer";
import EditPassword from "../pages/EditPassword";
import PatientEditProfile from "../pages/PatientEditProfile";
import MViewFirstPage from "../pages/KnowldgeSharing/Mobile View/MVIewFirstPage";
import ReservationDoctor from "../screen/ReservationsDoctor";


// create drawer navigation
const Drawer = createDrawerNavigator();

const DoctorDrawer = props => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="DoctorDashboard" component={DoctorDashboard} />
      <Drawer.Screen name="EditProfile" component={PatientEditProfile} />
      <Drawer.Screen name="EditPassword" component={EditPassword} />
      <Drawer.Screen name="Knowledge Sharing Center" component={MViewFirstPage} />

      <Drawer.Screen name="DoctorProfile" component={DoctorProfile} />
      {/* <Drawer.Screen name="See Reservations" component={ReservationDoctor} /> */}

    </Drawer.Navigator>
  );
};

export default DoctorDrawer;