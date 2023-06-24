import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Animated, Easing } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import BASE_URL from '../config'

const OTPVerification = (props) => {
  const [otp, setOTP] = useState('');
  const [otpError, setOTPError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const opacityAnimation = useState(new Animated.Value(0))[0];
  const [email, setEmail] = useState('');
  const route = useRoute();
  const { otpEmail } = route.params;

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

  const handleOTP = (text) => {
    setOTP(text);
  };

  const handleResendOTP = () => {
    setLoading(true);

    // Send a request to the server to resend the OTP
    axios.post(`${BASE_URL}/api/users/resend-otp`, {
        email: otpEmail,
      })
      .then((response) => {
        console.log('OTP resent successfully:', response.data);
        setLoading(false);
        setResendTimer(60);
        startTimer();
      })
      .catch((error) => {
        console.error('Failed to resend OTP:', error);
        setLoading(false);
        alert('Failed to resend OTP, please try again.');
      });
  };

  const startTimer = () => {
    let timer = setInterval(() => {
      setResendTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
    }, 60000);
  };

  const handleSubmit = () => {
    if (!otp) {
      setOTPError(true);
      return;
    }

    setLoading(true);
    setOTPError(false); // Clear the error state

    // Send the OTP and email to the server for verification
    axios.post(`${BASE_URL}/api/users/verify-otp`, {
        otp: otp,
        email: otpEmail,
      })
      .then((response) => {
        setLoading(false);
        console.log('OTP verification successful:', response.data);
        setLoading(false);
        // Redirect the user to the next page
         props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('OTP verification failed:', error);
        setLoading(false);
        alert('OTP verification failed, please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0c2461', '#1e3799', '#0c2461']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradient}>
        <View style={styles.logoContainer}>
          <Animated.View style={[styles.logoCircle, { opacity: opacityAnimation }]}>
            <Image source={require('../assets/Logo/Diamate.png')} style={styles.logo} />
          </Animated.View>
          <View style={styles.DiaMate}>
            <Animated.Text style={[styles.text1, { opacity: opacityAnimation }]}>DiaMate</Animated.Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, otpError && styles.errorInput]}
            underlineColorAndroid="transparent"
            placeholder="Enter OTP"
            placeholderTextColor="#fff"
            autoCapitalize="none"
            onChangeText={handleOTP}
            value={otp}
          />
          {otpError && <Text style={styles.errorText}>Please enter OTP</Text>}
          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify'}</Text>
          </TouchableOpacity>
          <View style={styles.resendContainer}>
            {resendTimer === 0 ? (
              <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP} disabled={loading}>
                <Text style={styles.resendButtonText}>{loading ? 'Resending...' : 'Resend OTP'}</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.resendTimerText}>Resend OTP in {resendTimer} seconds</Text>
            )}
          </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    backgroundColor: '#fff',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  DiaMate: {
    marginTop: 10,
  },
  text1: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#fff',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a69bd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  resendButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  resendTimerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default OTPVerification;
