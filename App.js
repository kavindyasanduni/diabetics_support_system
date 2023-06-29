//import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './routes/HomeStack';
import MyDrawer from './routes/Drawer';
import Welcome from './pages/Welcome';
import PatienteditProfile from './pages/PatientEditProfile';
import PatientProfile from './pages/PatientProfile';
import { UserProvider } from './pages/UserContext';

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
