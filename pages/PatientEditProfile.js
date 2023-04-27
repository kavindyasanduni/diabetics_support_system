import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const PatientEditProfile = ({ route, navigation }) => {
  const { id, firstname: currentFirstname, email: currentEmail } = route.params;
  const [firstname, setFirstname] = useState(currentFirstname);
  const [email, setEmail] = useState(currentEmail);

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`http://localhost:8080/api/users/${id}`, {
        firstname,
        email,
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstname}
        onChangeText={setFirstname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Save Changes" onPress={handleUpdateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    minWidth: '100%',
  },
});

export default PatientEditProfile;
