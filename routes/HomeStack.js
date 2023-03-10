import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Welcome from '../pages/Welcome.js';
import Login from '../pages/Login.js';
import PatientSignUp from '../pages/PatientSignUp.js';

const Stack = createNativeStackNavigator();

const Navigation = props => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/>
                <Stack.Screen name="Login" component={Login} options={{headerShown:true}}/>
                <Stack.Screen name="PatientSignUp" component={PatientSignUp} options={{headerShown:true}}/>
            
            </Stack.Navigator>
        </NavigationContainer>
    );
}
 export default Navigation;
