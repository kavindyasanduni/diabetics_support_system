import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminDashboard from "../pages/AdminDashboard";
import AdminProfile from "../pages/AdminProfile";
import CustomDrawer from "./CustomDrawer";
import Dashbord from "../pages/Admin Dashbord/Dashbord.js";
import Knowladgesharingdashbord from "../pages/KnowldgeSharing/knowladgesharingdashbord";
import UpdateDoctorDetails from "../screen/UpdateDoctor";
import UpdateNutritionistDetails from "../screen/UpdateNutritionist";
import AddDoctorData from "../screen/DoctorDetails";
import AddNutritionistData from "../screen/NutitionistDetails";
// create drawer navigation
const Drawer = createDrawerNavigator();

const AdminDrawer = props => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Dashbord" component={Dashbord} />
      <Drawer.Screen name="AdminProfile" component={AdminProfile} />
      <Drawer.Screen name="Knowladgesharing dashbord" component={Knowladgesharingdashbord} />
      <Drawer.Screen name="Add new Doctor" component={AddDoctorData} />
      <Drawer.Screen name="Add new Nutritionist" component={AddNutritionistData} />
     
      <Drawer.Screen name="Update doctor details" component={UpdateDoctorDetails} />
      <Drawer.Screen name="Update nutritionist details" component={UpdateNutritionistDetails} />

    </Drawer.Navigator>
  );
};

export default AdminDrawer;