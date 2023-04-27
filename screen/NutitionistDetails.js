import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';

function AddUserDetails2 () {
  const [name, setName] = useState('');
  const [PhoneNo, setPhoneNo] = useState('');
  const [Email, setEmail] = useState('');
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [AvailableDays, setAvailableDays] = useState('');
  const [AvailableTime, setAvailableTime] = useState('');
 

  

  return (
    <View style={styles.container}>
      

      <Text style={styles.input1}>Add New Nutritionist</Text>
      <TextInput
        style={styles.input}
        placeholder=" Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone No"
        keyboardType="numeric"
        value={PhoneNo}
        onChangeText={setPhoneNo}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={Email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={UserName}
        onChangeText={setUserName}
      />
        <TextInput
        style={styles.input}
        placeholder="Password"
        value={Password}
        onChangeText={setPassword}
      />
        <TextInput
        style={styles.input}
        placeholder="Available Days"
        value={AvailableDays}
        onChangeText={setAvailableDays}
      />
        <TextInput
        style={styles.input}
        placeholder="Available Time"
        value={AvailableTime}
        onChangeText={setAvailableTime}
      />
      <TouchableOpacity style={styles.button} onPress>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      
     
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    padding: 7,
    paddingLeft:15,
    marginBottom: 10,
  },
    input1:{
        marginBottom:30,
        fontSize:18,
        fontWeight:'bold',
        paddingTop:50,

    },
     input2:{
        marginBottom:15,
        fontSize:18,
        fontWeight:'bold',

    },
  button: {
    backgroundColor: '#0E1879',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width:150,
    marginLeft:150,
    
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AddUserDetails2;
