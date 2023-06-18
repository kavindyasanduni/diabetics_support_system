import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import axios from 'axios'

//sign up page for the patient 

const PatientSignUp = props => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [NIC, setNIC] = useState('')
  const [email, setEmail] = useState('')
  const [guardianName, setGuardianName] = useState('')
  const [guardianEmail, setGuardianEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [NICError, setNICError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [guardianNameError, setGuardianNameError] = useState(false)
  const [guardianEmailError, setGuardianEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmpasswordError, setConfirmPasswordError] = useState(false)

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// set user inputs into variables
  const handleFirstName = text => {
    setFirstName(text)
  }

  const handleLastName = text => {
    setLastName(text)
  }

  const handleNIC = text => {
    setNIC(text)
  }

  const handleEmail = text => {
    setEmail(text)
  }


  const handlePassword = text => {
    setPassword(text)
  }

  const handleConfirmPassword = text => {
    setConfirmPassword(text)
  }
  
//validation of input fields
  const handleSubmit = () => {
    if (!firstName) {
      setFirstNameError(true)
      return;
    }
    if (!lastName) {
      setLastNameError(true)
      return;
    }
    if (!NIC) {
      setNICError(true)
      return;
    }
    if (!email) {
      setEmailError(true)
      return;
    }
    
    if (!password) {
      setPasswordError(true)
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError(true)
      return;
    }
    

    if (!firstName || !lastName || !NIC || !email || !password || !confirmPassword) {
      alert('All fields are required');
      return;
    }
    
    

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (passwordRegex.test(password)) {
      // Password meets the criteria
      if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
      }

      if (password !== confirmPassword) {
        alert('Password does not match');
        return;
      }

    } else {
      // Password does not meet the criteria
      alert('password should have at least one spelling, number and symbol')
    }
  
    

    // Send the data to the server
    axios.post('http://192.168.8.167:8082/api/users/adduser', {
      email: email,
      firstname:firstName,
      lastname:lastName,
      nic: NIC,
      password : password,
      
     
    })
    .then(response => {
      console.log('Data successfully saved to database:', response.data);
      //alert('Sign up successful!');
      // Navigate to the login page
      props.navigation.navigate('GuardianSignUp',{ otpEmail: email });
    })
    .catch(error => {
      console.error('Error saving data:', error);
      alert('Error saving data, please try again.');
    });
  };

  return (
    <View style={{top:20}}>
      
      <Text style={{ color: '#7a42f4', fontSize: 20, top: 50, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>Enter Your Details</Text>
      <TextInput
        style={[styles.input, firstNameError && styles.errorInput]}
        underlineColorAndroid="transparent"
        placeholder="First Name"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleFirstName}
      />
      <TextInput
        style={[styles.input, lastNameError && styles.errorInput]}
        underlineColorAndroid="transparent"
        placeholder="Last Name"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleLastName}
      />
      <TextInput
        style={[styles.input, NICError && styles.errorInput]}
        underlineColorAndroid="transparent"
        placeholder="NIC"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleNIC}
        keyboardType='numeric'
        maxLength={12}
      />
      <TextInput
        style={[styles.input, emailError && styles.errorInput]}
        underlineColorAndroid="transparent"
        placeholder="Email"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleEmail}
      />
      
      <TextInput
        style={[styles.input, passwordError && styles.errorInput]}
        underlineColorAndroid="transparent"
        placeholder="Password"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handlePassword}
        secureTextEntry={true}
      />
      
      <TextInput
        style={[styles.input, confirmpasswordError && styles.errorInput]}
        underlineColorAndroid="transparent"
        placeholder="Confirm Password"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        onChangeText={handleConfirmPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity
            style = {styles.submitButton}
            onPress={handleSubmit}>
            <Text style = {styles.submitButtonText}> Next </Text>
      </TouchableOpacity>
      </View>
   );
       
}
   export default PatientSignUp

   const styles = StyleSheet.create({
      container: {
         paddingTop: 23,
         borderRadius:22,
      },
      input: {
         margin: 5,
         height: 40,
         top:80,
         left:35,
         width:300,
         borderColor: '#7a42f4',
         borderWidth: 1,
         borderRadius:22
      },
      submitButton: {
         backgroundColor: '#7a42f4',
         padding: 10,
         margin: 15,
         height: 40,
         width:258,
         top:100,
         left:60,
         borderRadius:22,
         alignItems:'center'
      },
      submitButtonText:{
         color: 'white'
   
      },
      errorInput: {
        borderColor: 'red'
      }
    
   })
