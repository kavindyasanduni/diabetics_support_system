import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import BASE_URL from '../config'

const GuardianSignUp = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [NIC, setNIC] = useState('');
  const [email, setEmail] = useState('');

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [NICError, setNICError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const route = useRoute();
  const { otpEmail } = route.params;

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const handleFirstName = text => {
    setFirstName(text);
  };

  const handleLastName = text => {
    setLastName(text);
  };

  const handleNIC = text => {
    setNIC(text);
  };

  const handleEmail = text => {
    setEmail(text);
  };

  const handleSubmit = () => {
    if (!firstName) {
      setFirstNameError(true);
      return;
    }
    if (!lastName) {
      setLastNameError(true);
      return;
    }
    if (!NIC) {
      setNICError(true);
      return;
    }
    if (!email) {
      setEmailError(true);
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (!firstName || !lastName || !NIC || !email) {
      alert('All fields are required');
      return;
    }

    axios
      .post(`${BASE_URL}/api/users/adduser`, {
        email: email,
        firstname: firstName,
        lastname: lastName,
        nic: NIC,
        password: 'Guardian@123',
        user_type: 'Guardian'
      })
      .then(response => {
        console.log('Data successfully saved to database:', response.data);
        props.navigation.navigate('OTPVerification', { otpEmail: otpEmail });
      })
      .catch(error => {
        console.error('Error saving data:', error);
        alert('Error saving data, please try again.');
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#0c2461', '#1e3799', '#0c2461']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.1, 0.66, 1]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Image source={require('../assets/Logo/Diamate.png')} style={styles.logo} />
            </View>
          </View>
          <Text style={styles.title}>Enter Your Guardian Details</Text>
          <TextInput
            style={[styles.input, firstNameError && styles.errorInput]}
            underlineColorAndroid="transparent"
            placeholder="Guardian First Name"
            placeholderTextColor="#fff"
            autoCapitalize="none"
            onChangeText={handleFirstName}
          />
          <TextInput
            style={[styles.input, lastNameError && styles.errorInput]}
            underlineColorAndroid="transparent"
            placeholder="Guardian Last Name"
            placeholderTextColor="#fff"
            autoCapitalize="none"
            onChangeText={handleLastName}
          />
          <TextInput
            style={[styles.input, NICError && styles.errorInput]}
            underlineColorAndroid="transparent"
            placeholder="NIC Number"
            placeholderTextColor="#fff"
            autoCapitalize="none"
            keyboardType='numeric'
            maxLength={12}
            onChangeText={handleNIC}
          />
          <TextInput
            style={[styles.input, emailError && styles.errorInput]}
            underlineColorAndroid="transparent"
            placeholder="Email"
            placeholderTextColor="#fff"
            autoCapitalize="none"
            onChangeText={handleEmail}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  logoCircle: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    margin: 5,
    height: 40,
    //top:10,
    //left:25,
    marginTop:20,
    width:'90%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius:22,
    color:'#fff',
    paddingLeft:20,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  button: {
    width: '80%',
    backgroundColor: '#1e3799',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default GuardianSignUp;
