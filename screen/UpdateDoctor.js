import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

function UpdateUserDetails() {
  const [SelectDoctor, setSelectDoctor] = useState('');
  const [SelectAvailableDays, setSelectAvailableDays] = useState('');
  const [SelectAvailableTime, setSelectAvailableTime] = useState('');

  const handleSave = () => {
    // handle save logic here
  };

  const handleChoosePhoto = () => {
    // handle choose photo logic here
  };

  return (
    <View style={styles.container}>
   
      <Text style={styles.input1}>Update  Doctor</Text>

       <TextInput
        style={styles.input}
        placeholder="Select Doctor"
        value={SelectDoctor}
        onChangeText={setSelectDoctor}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Available Days"
        value={SelectAvailableDays}
        onChangeText={setSelectAvailableDays}
      />
        <TextInput
        style={styles.input}
        placeholder="Available Time"
        value={SelectAvailableTime}
        onChangeText={setSelectAvailableTime}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  input: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 25,
    padding: 7,
    paddingLeft: 15,
    marginBottom: 20,
  },
  input1: {
    marginBottom: 60,
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 50,
  },
  input2: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    marginLeft: 150,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default UpdateUserDetails;