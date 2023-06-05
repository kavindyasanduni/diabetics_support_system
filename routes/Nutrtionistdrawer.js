import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import NutritionistProfile from "../pages/NutritionistProfile";
import NutritionistDashboard from "../pages/NutritionistDashboard";
import CustomDrawer from "./CustomDrawer";

// create drawer navigation
const Drawer = createDrawerNavigator();

const NutritionistDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="NutritionistDashboard" component={NutritionistDashboard} />
      <Drawer.Screen name="NutritionistProfile" component={NutritionistProfile} />
    </Drawer.Navigator>
  );
}

export default NutritionistDrawer;