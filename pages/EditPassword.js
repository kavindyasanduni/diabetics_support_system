import React, { useState ,useContext} from 'react';
import { View, TextInput,Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from '../pages/UserContext';

const EditPassword = props => {

  const { userId } = useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    const updatedUser = { currentPassword: currentPassword, newPassword: newPassword };
    axios.put(`http://192.168.8.167:8082/api/users/${userId}/password`, updatedUser)
      .then(response => {
        Alert.alert("Password updated successfully");
      })
      .catch(error => {
        Alert.alert("Error updating password");
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>

    <Text style={{ color: '#7a42f4', fontSize: 20, top: 0.1, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>Update Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry={true}
        value={currentPassword}
        onChangeText={text => setCurrentPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <Button title="Save" onPress={handleSave} />
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
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});

export default EditPassword;
