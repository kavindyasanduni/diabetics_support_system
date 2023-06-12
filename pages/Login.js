import React, { Component,useState,useContext} from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from './UserContext';
import { LinearGradient } from "expo-linear-gradient";


// Login screen for the users

const Login = props => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const { setUserId } = useContext(UserContext);


  const handleLoginEmail = text => {
    setEmail(text);
  };

  const handleLoginPassword = text => {
    setPassword(text);
  };

  const handleForgotPassword = () => {
    props.navigation.navigate('ForgotPassword');
  };

  const handleOnPress = async () => {
    
    if (!email) {
      setEmailError(true)
      return;
    }
    
    if (!password) {
      setPasswordError(true)
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.8.100:8082/api/users/login', {
        email: email,
        password: password,
      });
  
      if (response.status !== 200) {
        throw new Error('Invalid email or password');
      }
  
      const data = response.data;
      const userId = data.uid;
      setUserId(userId);
      //console.log(userId);
      //check user type of the user
      if (data.user_type === 'Doctor') {
        props.navigation.navigate('DoctorDashboard');
      } else if (data.user_type === 'patient') {
        props.navigation.navigate('PatientHome');
      }else if(data.user_type === 'Nutritionist'){
        props.navigation.navigate('NutritionistDashboard');
      }else if(data.user_type === 'Guardian'){
        props.navigation.navigate('Guardianhome');
      }
      else {
        throw new Error('Invalid user type');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  
  const colors = ["#8914af", "#05b9de", "#45a7a9"];
  const start = { x: 0, y: 0 };
  const end = { x: 0, y: 1 };
  const locations = [0.1, 0.66, 1];

  return (
    <View style = {{flex:1}}>
       <LinearGradient
        colors={colors}
        start={start}
        end={end}
        locations={locations}
        style={styles.gradient}
      >
      <TouchableOpacity>
      <Text style={styles.signup} onPress={()=>props.navigation.navigate("PatientSignUp")}>New Patient</Text>
      </TouchableOpacity>
      <TextInput
        style={[styles.input,emailError && styles.errorInput]}
        underlineColorAndroid="transparent"
        placeholder="Email"
        placeholderTextColor='#fff'
        autoCapitalize="none"
        onChangeText={handleLoginEmail}
        value={email}
      />
      <TextInput
        style={[styles.input,passwordError && styles.errorInput]}
        underlineColorAndroid="transparent"
        placeholder="Password"
        placeholderTextColor='#fff'
        autoCapitalize="none"
        onChangeText={handleLoginPassword}
        value={password}
        secureTextEntry={true}
      />
     
      
    <View style={{alignItems:'center'}}>
      <TouchableOpacity style={styles.button} onPress={handleOnPress}>
        <Text  style={styles.buttonText} >Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgot} onPress={handleForgotPassword}>
        <Text style={styles.forgotText}>Forgot Password</Text>
      </TouchableOpacity>
       </View>
      </LinearGradient>
 
    </View>
  );
  }

const styles = StyleSheet.create({
  signup:{
    width:89,
    height:24,
    left:300,
    top:75,
    color:'#fff',
    textDecorationLine: 'underline'
  },
  container: {
    paddingTop: 1,
  },
  input: {
    margin: 10,
    height: 40,
    top: 300,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 32,
    paddingLeft:20,
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
    // left: 85,
    borderRadius: 32,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
  forgot:{
    top:410,
    marginTop:10,
    height:24,

  },
  forgotText: {
    textAlign: 'center',
    color: '#7a42f4',
    textDecorationLine: 'underline',
    marginTop: 1,
  },
  errorInput: {
    borderColor: 'red'
  },
  gradient: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default Login;
