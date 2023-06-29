import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import GuardianProfile from "../pages/GuardianProfile";
import Guardianhome from "../pages/Guardianhome";
import CustomDrawer from "./CustomDrawer";
import EditPassword from "../pages/EditPassword";
import PatientEditProfile from "../pages/PatientEditProfile";
import MViewFirstPage from "../pages/KnowldgeSharing/Mobile View/MVIewFirstPage";
// create drawer navigation
const Drawer = createDrawerNavigator();

const Guardiandrawer = props =>{
    return (
    
      <Drawer.Navigator drawerContent={props =><CustomDrawer{...props}/>}>
        <Drawer.Screen name="Guardian home" component={Guardianhome} />
        <Drawer.Screen name="Edit Profile" component={PatientEditProfile} />
        <Drawer.Screen name="Edit Password" component={EditPassword} />
        <Drawer.Screen name="Knowledge Sharing Center" component={MViewFirstPage} />
      </Drawer.Navigator>
      
    );
}

export default Guardiandrawer;