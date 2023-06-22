import React, { Component,useState,useContext,useRef,useEffect} from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet ,  Animated,Easing,Image,ScrollView,KeyboardAvoidingView} from 'react-native'
//import {KeyboardAvoidingView, Platform} from 'react-native-keyboard-aware-scroll-view'
import { Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from './UserContext';
import { LinearGradient } from "expo-linear-gradient";
import BASE_URL from '../config';
import Icon from "react-native-vector-icons/AntDesign";


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
      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email: email,
        password: password,
      });
  
      if (response.status !== 200) {
        throw new Error('Invalid email or password');
      }
  
      const data = response.data;
      const userId = data.uid;
      setUserId(userId);

      setEmail(''); // Reset email field
      setPassword(''); // Reset password field
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
      }else if(data.user_type === 'Admin'){
        props.navigation.navigate('AdminDashboard');
      }
      else {
        throw new Error('Invalid user type');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  
  const colors = ["#0c2461", "#1e3799", "#0c2461"];
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
    // <View style = {{flex:1}}>
      <View style = {{flex:1}}>
       <LinearGradient
        colors={colors}
        start={start}
        end={end}
        locations={locations}
        style={styles.gradient}
        >
    <ScrollView>

       <TouchableOpacity style={styles.signUpContainer}>
       <Text style={styles.signup} onPress={()=>props.navigation.navigate("PatientSignUp")}>
        New Patient
        
        </Text>
        <Icon style={styles.signupIcon} name="adduser" size={20} color="#1D11AD" />
      
       </TouchableOpacity>
        <View style={styles.logoContainer}>

         <Animated.View style={[styles.logoCircle, { opacity: opacityAnimation }]}>
            <Image
              source={require("../assets/Logo/Diamate.png")}
              style={styles.logo}
            />
          </Animated.View>
          <View style={styles.DiaMate}>
          <Animated.Text
            style={[
              styles.text1,
              { opacity: opacityAnimation },
            ]}
          >
            DiaMate
          </Animated.Text>
          <View  style= {styles.ManageYD}>
          <Animated.Text
            style={[
              styles.text2,
              { opacity: opacityAnimation },
            ]}
          >
            Manage your Diabetes
          </Animated.Text>
          </View>
        </View >
       <View style={styles.inputButtonContainer}>
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
     </View>
     <View >
      <TouchableOpacity style={styles.button} onPress={handleOnPress}>
        <Text  style={styles.buttonText} >Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgot} onPress={handleForgotPassword}>
        <Text style={styles.forgotText}>Forgot Password</Text>
      </TouchableOpacity>
       </View>
     </View>
    </ScrollView>

      </LinearGradient>
    </View>  
    // </View>
  );
  }

const styles = StyleSheet.create({
  logoCircle: {
    width: 160,
    height: 160,
    borderRadius: 80, // half of width and height
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
  },
  DiaMate : {
    width: 269,
    margin: 20,

  },
  logoContainer: {
    alignItems: "center",
    marginTop: 130,
  },
  signUpContainer : {
    flexDirection: "row", // Arrange items horizontally
    alignItems: "center", // Align items vertically in the center
    left:280,
  
  },
  signup:{
    width:89,
    height:24,
    top:75,
    color:'#fff',
    textDecorationLine: 'underline'
  },
  signupIcon:{
    top:75,
    color:'#fff',
  },
  container: {
    //paddingTop: 1,
    flex: 1,
  },
  inputButtonContainer :{
    marginTop : 20,
    width:"90%",
    justifyContent: 'center',
  },
  input: {
    marginTop: 20,
    height: 40,
    // top: 330,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 32,
    paddingLeft:20,
    color:'#fff'
  },
  buttonContainer: {
    margin: 10,
  },
  button: {
    backgroundColor: "#4a69bd",
    padding: 10,
    // top: 400,
    width:258,
    height: 49,
    // left: 85,
    borderRadius: 32,
    marginTop:40,
    // alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
  forgot:{
    // top:410,
    marginTop:15,
    height:25,
    textDecorationStyle : 'none',

  },
  forgotText: {
    fontSize:15,
    textAlign: 'center',
    color: "rgba(255, 255, 255, 0.8)",
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
  text1: {
    height: 50,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#rgb(100, 170, 250)",
    fontFamily:""
  },
  text2: {
    textAlign: "center",
    width: 269,
    height: 33,
    fontSize: 18,
    // fontWeight: "bold",
    color: "#dfe4ea",
    // margin:30,
  },
});

export default Login;
