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


const App = () => { 
  return (
    <UserProvider>
      <Navigation/>
    </UserProvider>
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
