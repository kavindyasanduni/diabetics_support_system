import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import NutritionistProfile from "../pages/NutritionistProfile";
import CustomDrawer from "./CustomDrawer";

// create drawer navigation
const Drawer = createDrawerNavigator();

const NutritionistDrawer = props =>{
    return (
    
      <Drawer.Navigator drawerContent={props =><CustomDrawer{...props}/>}>
        <Drawer.Screen name="nutritionist" component={NutritionistProfile} />
      </Drawer.Navigator>
      
    );
}

export default NutritionistDrawer;