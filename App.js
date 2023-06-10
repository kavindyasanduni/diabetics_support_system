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
import Reservation from './screen/Reservation';
import DoctorsCard from './screen/Doctors';
import Table from './screen/ReservationHistory';
//import NutritionistCard from './screen/Nutritionist';
import AddProfile from './screen/ProfileDoc';
import PDash from './screen/PDashBoard';
import UpdateUserDetails from './screen/UpdateDoctor';
import SeeReservation from './screen/SeeReservation';
import AddUserDetails2 from './screen/NutitionistDetails';
import AddUserDetails from './screen/DoctorDetails'; 
//import UpdateUserDetails from './screen/UpdateDoctor';
import UpdateUserDetails2 from './screen/UpdateNutritionist';







const App = () => { 
  return (
    // <DoctorsCard/>
    // <View>
    //   <Text>Hello</Text>
    // </View>
    <Navigation/>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
