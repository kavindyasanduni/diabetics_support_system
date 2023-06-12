import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import axios from 'axios'

//patient can add guardian information

const GuardianSignUp = props => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [NIC, setNIC] = useState('')
  const [email, setEmail] = useState('')

  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [NICError, setNICError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  // get the user inputs into variabless
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
    
    // email valiadation 
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }

    if (!firstName || !lastName || !NIC || !email ) {
      alert('All fields are required');
      return;
    }
    
  
    

    // Send the data to the server
    axios.post('http://192.168.8.167:8082/api/users/adduser', {
      email: email,
      firstname:firstName,
      lastname:lastName,
      nic: NIC,
      password : "Guardian@123",
      user_type :"Guardian"
    })
    .then(response => {
      console.log('Data successfully saved to database:', response.data);
      alert('Sign up successful!');
      // Navigate to the login page
      props.navigation.navigate('Login');
    })
    .catch(error => {
      console.error('Error saving data:', error);
      alert('Error saving data, please try again.');
    });
  };

  return (
    <View style={{top:70}}>
      
      <Text style={{ color: '#7a42f4', fontSize: 20, top: 50, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>Enter Your Guardian Details</Text>
      <TextInput
        style={[styles.input, firstNameError && styles.errorInput]}
        underlineColorAndroid="transparent"
        placeholder="Guardian First Name"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleFirstName}
      />
      <TextInput
        style={[styles.input, lastNameError && styles.errorInput]}
        underlineColorAndroid="transparent"
        placeholder="Guardian Last Name"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleLastName}
      />
      <TextInput
        style={[styles.input, NICError && styles.errorInput]}
        underlineColorAndroid="transparent"
        placeholder="Guardian NIC"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleNIC}
        keyboardType='numeric'
        maxLength={12}
      />
      
      <TextInput
        style={[styles.input, emailError && styles.errorInput]}
        underlineColorAndroid="transparent"
        placeholder="Guardian Email"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleEmail}
      />

      <TouchableOpacity
            style = {styles.submitButton}
            onPress={handleSubmit}>
            <Text style = {styles.submitButtonText}> Sign Up </Text>
      </TouchableOpacity>
      </View>
   );
       
}
   export default GuardianSignUp

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
