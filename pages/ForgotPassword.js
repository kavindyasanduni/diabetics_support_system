import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

import BASE_URL from '../config';

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState('');

  const handleSendEmail = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/forgot-password`, {
        email: email,
      });

      if (response.status === 200) {
        setSuccess(true);
        setToken(response.data.token);
        props.navigation.navigate('Login');
      } else {
        throw new Error('Invalid email');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const colors = ['#0c2461', '#1e3799', '#0c2461'];
  const start = { x: 0, y: 0 };
  const end = { x: 0, y: 1 };
  const locations = [0.1, 0.66, 1];
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={colors} start={start} end={end} locations={locations} style={styles.gradient}>
        <View style={styles.logoContainer}>
          <Animated.View style={[styles.logoCircle, { opacity: opacityAnimation }]}>
            <Image source={require('../assets/Logo/Diamate.png')} style={styles.logo} />
          </Animated.View>
          <View style={styles.DiaMate}>
            <Animated.Text style={[styles.text1, { opacity: opacityAnimation }]}>DiaMate</Animated.Text>
            <View style={styles.ManageYD}>
              <Animated.Text style={[styles.text2, { opacity: opacityAnimation }]}>Manage your Diabetes</Animated.Text>
            </View>
          </View>
          <Text style={styles.title}>Enter your email to reset your password</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Enter your email"
            placeholderTextColor='#fff'
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
            <Text style={styles.buttonText}>Send Email</Text>
          </TouchableOpacity>
          {success && <Text style={styles.successMessage}>Password reset email sent successfully!</Text>}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 130,
  },
  logoCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  DiaMate: {
    alignItems: 'center',
  },
  text1: {
    fontSize: 24,
    color: '#fff',
    marginTop: 10,
    fontWeight: 'bold',
  },
  ManageYD: {
    flexDirection: 'row',
    marginTop: 8,
  },
  text2: {
    fontSize: 14,
    color: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginTop: 40,
  },
  input: {
    width: 280,
    height: 40,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 32,
    marginTop: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color:'#fff'
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#4a69bd',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    //fontWeight: 'bold',
  },
  successMessage: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default ForgotPassword;
