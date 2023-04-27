import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';


import axios from 'axios';

// user can change password via this screen.

const ChangePassword = props => { 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(true);

  

  const handleLoginPress = () => {
    props.navigation.navigate('Login');
  };


  const handleChangePassword = async () => {
    try {
        const email = props.navigation.getParam('email');

      if (!email) {
        throw new Error('Email not provided');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
// call API
      const response = await axios.post('https://192.168.34.213:8082/change-password', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        setSuccess(true);
      } else {
        throw new Error('Failed to change password');
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter new password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm new password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      {success ? (
        <View>
          <Text style={styles.successMessage}>Password reset successful!</Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.loginLink}>Go to Login Page</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7a42f4',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successMessage: {
    color: 'green',
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  loginLink: {
    color: '#007AFF',
    marginTop: 10,
  },
});

export default  ChangePassword;



