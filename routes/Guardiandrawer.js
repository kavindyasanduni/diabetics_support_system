import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import GuardianProfile from "../pages/GuardianProfile";
import Guardianhome from "../pages/Guardianhome";
import CustomDrawer from "./CustomDrawer";
import MViewFirstPage from "../pages/KnowldgeSharing/Mobile View/MVIewFirstPage";
// create drawer navigation
const Drawer = createDrawerNavigator();

const Guardiandrawer = props =>{
    return (
    
      <Drawer.Navigator drawerContent={props =><CustomDrawer{...props}/>}>
        <Drawer.Screen name="Guardianhome" component={Guardianhome} />
        <Drawer.Screen name="Knowledge Sharing Center" component={MViewFirstPage} />

        <Drawer.Screen name="GuardianProfile" component={GuardianProfile} />
      </Drawer.Navigator>
      
    );
}

export default Guardiandrawer;