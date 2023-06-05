//import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './routes/HomeStack';
import MyDrawer from './routes/Drawer';
import Welcome from './pages/Welcome';
import PatienteditProfile from './pages/PatientEditProfile';
import PatientProfile from './pages/PatientProfile';
//import RoleIdentify from './pages/RoleIdentify';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import GuardianSignUp from './pages/GuardianSignUp';
import PatientEditProfile from './pages/PatientEditProfile';
import PDash from './screen/PDashBoard';


const App = () => { 
  return (
    <Navigation/>
    // <View>
    //   <Text>Hello</Text>
    // </View>
    // <PDash/>
  )
}

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
