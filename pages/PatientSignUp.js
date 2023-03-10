import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

const PatientSignUp = props => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [NIC, setNIC] = useState('')
  const [email, setEmail] = useState('')
  const [guardianName, setGuardianName] = useState('')
  const [guardianEmail, setGuardianEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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

  const handleGuardianName = text => {
    setGuardianName(text)
  }

  const handleGuardianEmail = text => {
    setGuardianEmail(text)
  }

  const handlePassword = text => {
    setPassword(text)
  }

  const handleConfirmPassword = text => {
    setConfirmPassword(text)
  }

  const handleSubmit = () => {
    if (!firstName || !lastName || !NIC || !email || !guardianName || !guardianEmail || !password || !confirmPassword) {
      alert('All fields are required')
      return
    }
    if (password !== confirmPassword) {
      alert('Password does not match')
      return
    }
    alert(`
      First Name: ${firstName}
      Last Name: ${lastName}
      NIC: ${NIC}
      Email: ${email}
      Guardian Name: ${guardianName}
      Guardian Email: ${guardianEmail}
    `)
  }

  return (
    <View >
      <TouchableOpacity>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="First Name"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleFirstName}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Last Name"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleLastName}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="NIC"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleNIC}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Email"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleEmail}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Guardian Name"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleGuardianName}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Guardian Email"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handleGuardianEmail}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Password"
        placeholderTextColor='#7a42f4'
        autoCapitalize="none"
        onChangeText={handlePassword}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Confirm Password"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        onChangeText={handleConfirmPassword}
      />

      <TouchableOpacity
            style = {styles.submitButton}
            onPress={()=> props.navigation.navigate("Login")}>
            <Text style = {styles.submitButtonText}> Sign Up </Text>
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
         top:75,
         left:25,
         width:340,
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
   
      }
   })
