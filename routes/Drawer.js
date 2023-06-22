import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import PatientHome from '../pages/PatientHome';
import PatientProfile from '../pages/PatientProfile';
import PatientSetting from '../pages/PatientSetting';
import CustomDrawer from "./CustomDrawer";
import PatientEditProfile from "../pages/PatientEditProfile";
import EditPassword from "../pages/EditPassword";
import MViewFirstPage from "../pages/KnowldgeSharing/Mobile View/MVIewFirstPage";

// create drawer navigation
const Drawer = createDrawerNavigator();

const MyDrawer = props =>{
    return (
    
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}  />}>
        <Drawer.Screen name="PatientHome" component={PatientHome} options={{headerStyle:{backgroundColor:'#82006d'}}}/>
        <Drawer.Screen name="EditProfile" component={PatientEditProfile} options={{headerStyle:{backgroundColor:'#82006d'}}}/>
        <Drawer.Screen name="EditPassword" component={EditPassword} options={{headerStyle:{backgroundColor:'#82006d'}}}/>
        <Drawer.Screen name="PatientSetting" component={PatientSetting} options={{headerStyle:{backgroundColor:'#82006d'}}}/>
        <Drawer.Screen name="Knowledge Sharing Center" component={MViewFirstPage} />

        <Drawer.Screen name="PatientProfile" component={PatientProfile} />
        
        {/* <Drawer.Screen name="PatientSetting" component={PatientSetting} /> */}

      </Drawer.Navigator>
      
    );
}

export default MyDrawer;