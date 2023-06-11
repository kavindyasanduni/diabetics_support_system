import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminDashboard from "../pages/AdminDashboard";
import AdminProfile from "../pages/AdminProfile";
import CustomDrawer from "./CustomDrawer";
import Dashbord from "../pages/Admin Dashbord/Dashbord.js";

// create drawer navigation
const Drawer = createDrawerNavigator();

const AdminDrawer = props => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Dashbord" component={Dashbord} />
      <Drawer.Screen name="AdminProfile" component={AdminProfile} />
    </Drawer.Navigator>
  );
};

export default AdminDrawer;