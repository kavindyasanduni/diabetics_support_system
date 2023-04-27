import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Welcome from '../pages/Welcome.js';
import Login from '../pages/Login.js';
import PatientSignUp from '../pages/PatientSignUp.js';
import PatientHome from "../pages/PatientHome.js";
import PatientEditProfile from "../pages/PatientEditProfile.js";
import MyDrawer from "./Drawer.js";
import Dashbord from "../pages/Admin Dashbord/Dashbord.js";
import knowladgesharingdashbord from "../pages/KnowldgeSharing/knowladgesharingdashbord.js";
import ButtonD from "../pages/Admin Dashbord/ButtonD.js";
import DeleteContentFromKSC from "../pages/KnowldgeSharing/DeleteContentFromKSC.js";

const Stack = createNativeStackNavigator();

const Navigation = props => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/>
                <Stack.Screen name="Login" component={Login} options={{headerShown:true}}/>
                <Stack.Screen name="PatientSignUp" component={PatientSignUp} options={{headerShown:true}}/>
                <Stack.Screen name="Admin" component={Dashbord} />
                <Stack.Screen name="knowladgesharingdashbord" component={knowladgesharingdashbord} />
                <Stack.Screen name="deletefromksc" component={DeleteContentFromKSC} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
 export default Navigation;
