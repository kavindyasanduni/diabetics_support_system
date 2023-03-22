import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import PatientHome from '../pages/PatientHome';
import PatientProfile from '../pages/PatientProfile';
import PatientSetting from '../pages/PatientSetting';
import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator();

const MyDrawer = props =>{
    return (
    
      <Drawer.Navigator drawerContent={props =><CustomDrawer{...props}/>}>
        <Drawer.Screen name="PatientHome1" component={PatientHome} />
        <Drawer.Screen name="PatientProfile" component={PatientProfile} />
        <Drawer.Screen name="PatientSetting" component={PatientSetting} />
      </Drawer.Navigator>
      
    );
}

export default MyDrawer;