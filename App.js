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
import DoctorConsultationScreen from './pages/OnlineConsultation/Online';
import DoctorCalling from './pages/OnlineConsultation/DoctorCalling';
import NutritionistCalling from './pages/OnlineConsultation/NutritionistCalling';
import EndConsultation from './pages/OnlineConsultation/EndConsultation';
import DoctorTable from './pages/OnlineConsultation/DoctorTable';
import NutritionistTable from './pages/OnlineConsultation/NutritionistTable';

const App = () => { 
  return (
    <Navigation/>
    // <View>
    //   <Text>Hello</Text>
    // </View>
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
