import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import NutritionistProfile from "../pages/NutritionistProfile";
import NutritionistDashboard from "../pages/NutritionistDashboard";
import CustomDrawer from "./CustomDrawer";
import EditPassword from "../pages/EditPassword";
import PatientEditProfile from "../pages/PatientEditProfile";
import MViewFirstPage from "../pages/KnowldgeSharing/Mobile View/MVIewFirstPage";
import ReservationNutritionist from "../screen/ReservationsNutritionist";
// create drawer navigation
const Drawer = createDrawerNavigator();

const NutritionistDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Nutritionist Dashboard" component={NutritionistDashboard} />
      <Drawer.Screen name="Edit Profile" component={PatientEditProfile} />
      <Drawer.Screen name="Edit Password" component={EditPassword} />
      <Drawer.Screen name="Knowledge Sharing Center" component={MViewFirstPage} />
      {/* <Drawer.Screen name="Available Reservation" component={ReservationNutritionist} /> */}
    </Drawer.Navigator>
  );
}

export default NutritionistDrawer;