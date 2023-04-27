import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import DoctorProfile from "../pages/DoctorProfile";
import CustomDrawer from "./CustomDrawer";


// create drawer navigation
const Drawer = createDrawerNavigator();

const Doctordrawer = props =>{
    return (
    
      <Drawer.Navigator drawerContent={props =><CustomDrawer{...props}/>}>
        <Drawer.Screen name="doctor" component={DoctorProfile} />
      </Drawer.Navigator>
      
    );
}

export default Doctordrawer;