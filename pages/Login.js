import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Alert } from 'react-native';

const Login = props => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLoginEmail = text => {
    setEmail(text);
  };

  const handleLoginPassword = text => {
    setPassword(text);
  };

  const handleOnPress = () => {
    Alert.alert('You clicked the button!');
  };

  return (
    <View>
      <TouchableOpacity>
      <Text style={styles.signup} onPress={()=>props.navigation.navigate("PatientSignUp")}>Sign Up</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Email"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleLoginEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Password"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleLoginPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} >
        <Text  style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  signup:{
    width:89,
    height:24,
    left:300,
    top:30,
    color:'#7a42f4'
  },
  container: {
    paddingTop: 1,
  },
  input: {
    margin: 10,
    height: 40,
    top: 300,
    borderColor: '#7a42f4',
    borderWidth: 1,
    borderRadius: 32,
  },
  buttonContainer: {
    margin: 10,
  },
  button: {
    backgroundColor: '#7a42f4',
    padding: 10,
    top: 400,
    width: 258,
    height: 49,
    left: 85,
    borderRadius: 32,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default Login;
