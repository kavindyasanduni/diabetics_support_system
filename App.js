//import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './routes/HomeStack';
import MyDrawer from './routes/Drawer';
import Welcome from './pages/Welcome';
import PatienteditProfile from './pages/PatientEditProfile';
import PatientProfile from './pages/PatientProfile';
import { UserProvider } from './pages/UserContext';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import GuardianSignUp from './pages/GuardianSignUp';
import PatientEditProfile from './pages/PatientEditProfile';
import EditPassword from './pages/EditPassword';
import UpdateContainerCard from './pages/KnowldgeSharing/UpdateContainerCard';
import PDash from './screen/PDashBoard';
import Reservation from './screen/Reservation';
import DoctorsCard from './screen/Doctors';
import Table from './screen/ReservationHistory';
//import NutritionistCard from './screen/Nutritionist';
import AddProfile from './screen/ProfileDoc';

import UpdateUserDetails from './screen/UpdateDoctor';
import SeeReservation from './screen/SeeReservation';
import AddUserDetails2 from './screen/NutitionistDetails';
import AddUserDetails from './screen/DoctorDetails'; 
//import UpdateUserDetails from './screen/UpdateDoctor';
import UpdateUserDetails2 from './screen/UpdateNutritionist';
// import DoctorDashboard from './screen/DoctorDashboard';
import NutritionistCard from './screen/Nutritionist';
import Guardianhome from './pages/Guardianhome';
import NutritionistDashboard from './pages/NutritionistDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AddDoctorData from './screen/DoctorDetails';
import ReservationCancel from './screen/ReservationCansel';
import AddNutritionistData from './screen/NutitionistDetails';
import UpdateNutritionistDetails from './screen/UpdateNutritionist';
import UpdateDoctorDetails from './screen/UpdateDoctor';
import Search from './screen/Component/Search';








const App = () => { 
  return (
    // <UserProvider>
      // <Navigation/>
    // </UserProvider>
    //<AddDoctorData/>
    //<PDash/>
   //<Guardianhome/>
   //<DoctorDashboard/>
   //<NutritionistDashboard/>
   //<SeeReservation/>
   //<Reservation/>
   //<ReservationCancel/>
   //< UpdateDoctorDetails/>
   <AddNutritionistData/>
   //<UpdateNutritionistDetails/>
  // <search/>
   
   
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
