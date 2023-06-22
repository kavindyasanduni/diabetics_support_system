import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const OTPVerification = props => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [otpError, setOTPError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const route = useRoute();
  const { otpEmail } = route.params;

  const handleOTP = text => {
    setOTP(text);
  };

  const handleResendOTP = () => {
    setLoading(true);

  // Send a request to the server to resend the OTP
  axios
    .post('http://192.168.8.167:8082/api/users/resend-otp', {
      email: otpEmail,
    })
    .then(response => {
      console.log('OTP resent successfully:', response.data);
      setLoading(false);
      setResendTimer(60);
      startTimer();
    })
    .catch(error => {
      console.error('Failed to resend OTP:', error);
      setLoading(false);
      alert('Failed to resend OTP, please try again.');
    });
  };

  const startTimer = () => {
    let timer = setInterval(() => {
      setResendTimer(prevTimer => prevTimer - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
    }, 60000);
  };

  const handleSubmit = () => {
    if (!otp ) {
      setOTPError(true);
      return;
    }

    setLoading(true);
    setOTPError(false); // Clear the error state

    // Send the OTP and email to the server for verification
    axios
      .post('http://192.168.8.167:8082/api/users/verify-otp', {
        otp: otp,
        email: otpEmail,
      })
      .then(response => {
        console.log('OTP verification successful:', response.data);
        setLoading(false);
        // Redirect the user to the next page
         props.navigation.navigate('Login');
      })
      .catch(error => {
        console.error('OTP verification failed:', error);
        setLoading(false);
        alert('OTP verification failed, please try again.');
      });
  };


  return (
    <View style={{ top: 20 }}>
      <Text style={{ color: '#7a42f4', fontSize: 20, top: 50, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>Enter OTP</Text>
  
      <TextInput
        style={[styles.input, otpError && styles.errorInput]}
        underlineColorAndroid="transparent"
        placeholder="OTP"
        placeholderTextColor="#7a42f4"
        autoCapitalize="none"
        onChangeText={handleOTP}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>{loading ? 'Verifying...' : 'Verify'}</Text>
      </TouchableOpacity>
      <View style={styles.resendContainer}>
        {resendTimer === 0 ? (
          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendOTP}
            disabled={loading}
          >
            <Text style={styles.resendButtonText}>{loading ? 'Sending...' : 'Resend OTP'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendOTP}
            disabled={true}
          >
            <Text style={styles.resendButtonText}>Resend OTP in {resendTimer}s</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:'#fff'
  },
  errorInput: {
    borderColor: 'red',
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resendButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    height: 40,
    alignItems: 'center',
  },
  resendButtonText: {
    color: 'white',
  },
  resendText: {
    marginTop: 10,
    color: '#7a42f4',
    fontSize: 16,
  },
});
