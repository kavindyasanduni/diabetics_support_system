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
// import PDash from './screen/PDashBoard';
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
import FileManagement from './pages/FilesManagement';
import PaymentSummary from './pages/Admin Dashbord/Analytic Data/PaymentSummary';
import { StripeProvider } from '@stripe/stripe-react-native';









const App = () => { 
  return (
    <UserProvider>
      <StripeProvider
      publishableKey="pk_test_51NL9DjF3tLE6ePN1hTUUSJlWVrRQf6qPo9Yl4WL9uVKNwwMPsr5VFEUxaXPDNwfT8lI74fks8vBQNl3kn2Jscg9q003X9nnvgb"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <Navigation/>
      </StripeProvider>
    </UserProvider>
    // <FileManagement/>
    // <PaymentSummary/>
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
