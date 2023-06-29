import React, { useState ,useContext} from 'react';
import { View, TextInput,Text, Button, StyleSheet, Alert ,TouchableOpacity} from 'react-native';
import axios from 'axios';
import { UserContext } from '../pages/UserContext';
import BASE_URL from '../config';

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
    axios.put(`${BASE_URL}/api/users/${userId}/password`, updatedUser)
      .then(response => {
        Alert.alert("Password updated successfully");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch(error => {
        Alert.alert("Error updating password");
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>

    <Text style={{ color: '#0E1879', fontSize: 20, top: 0.1,marginBottom:5, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>Update Password</Text>

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
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#ffff'
  },
  input: {
    borderColor: '#0E1879',
    padding: 10,
    marginBottom: 10,
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#0E1879',
    padding: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditPassword;
