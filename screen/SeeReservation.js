import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';

const SeeReservation = () => {
  const [SelectDoctor, setSelectDoctor] = useState('');
  const [SelectNutritionist, setSelectNutritionist] = useState('');
  

  const handleSave = () => {
    // handle save logic here
  };

  const handleChoosePhoto = () => {
    // handle choose photo logic here
  };

  return (
    <View style={styles.container}>

    <View style={styles.box}>
      {/*<TouchableOpacity style={styles.photoButton} onPress={handleChoosePhoto}>
        {selectedPhoto ? (
          <Image source={{ uri: selectedPhoto }} style={styles.photo} />
        ) : (
          <Text style={styles.photoText}>Add Photo</Text>
        )}
      </TouchableOpacity>*/}

      
      <TextInput
        style={styles.input}
        placeholder=" Select Doctor"
        value={SelectDoctor}
        onChangeText={setSelectDoctor}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>See Reservation</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.box}>
      <TextInput
        style={styles.input}
        placeholder="Select Nutritionist"
        value={SelectNutritionist}
        onChangeText={setSelectNutritionist}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>See Reservation</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 100,
  },

  input: {
    borderWidth: 1,
    borderBottomColor: "blue",
    borderColor: "#E2E2E2",
    borderRadius: 5,
    padding: 7,
    paddingLeft: 15,
    marginBottom: 10,
    marginTop: 20,
    width: 200,
    marginLeft: 50,
  },

  box: {
    marginTop: 20,
    width: 325,
    backgroundColor: "#E2E2E2",
    borderRadius: 25,
    marginBottom: 25,
    height: 150,
  },

  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    marginBottom: 20,
    marginLeft: 150,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    //fontWeight: 500,
    fontSize: 18,
  },
});

export default SeeReservation
;
