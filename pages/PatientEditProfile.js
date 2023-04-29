import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const PatientEditProfile = props =>{

  const { userId } = props;
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [nic, setNic] = useState('');
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    axios.get(`http://192.168.8.167:8082/api/users/52`)
      .then(response => {
        setUser(response.data);
        setFirstName(response.data.firstname);
        setLastName(response.data.lastname);
        setEmail(response.data.email);
        setNic(response.data.nic);
      })
      .catch(error => console.error(error));
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }



    const updatedUser = { ...user, firstname: firstName, lastname: lastName, email: email, nic: nic, password: newPassword};
    axios.put(`http://192.168.8.167:8082/api/users/52`, updatedUser)
      .then(response => {
        setUser(response.data);
        setIsEditing(false);
      })
      .catch(error => console.error(error));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFirstName(user.firstname);
    setLastName(user.lastname);
    setEmail(user.email);
    setNic(user.nic);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={firstName}
        editable={isEditing}
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        value={lastName}
        editable={isEditing}
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        value={email}
        editable={isEditing}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        value={nic}
        editable={isEditing}
        onChangeText={text => setNic(text)}
      />
      {isEditing ?
        <>
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={handleCancel} />
        </>
        :
        <Button style={styles.title} title="Edit" onPress={handleEdit} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#7a42f4',
    padding: 10,
    marginBottom: 10,
    width:"90%",
    height:40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal:10,
  },
  title:{
    backgroundColor: '#7a42f4',
    padding: 10,
    borderRadius: 10,
  }
});

export default PatientEditProfile;
