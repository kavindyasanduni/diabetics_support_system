import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';

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
        props.navigation.navigate('ChangePassword', { email: email });
      } else {
        throw new Error('Invalid email');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your email to send the reset link</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>
      {success ? (
        <Text style={styles.successMessage}>Reset link sent successfully!</Text>
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
});

export default ForgotPassword;
