import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import axios from 'axios';

const PatientEditProfile = ({route,navigation}) => {
  const { userId, name, email, gender, profilePicture } = route.params;
  const [newName, setNewName] = useState(name);
  const [newPassword, setNewPassword] = useState('');
  const [newGender, setNewGender] = useState(gender);
  const [newEmail, setNewEmail] = useState(email);
  const [newProfilePicture, setNewProfilePicture] = useState(profilePicture);

  const handleNameChange = (text) => {
    setNewName(text);
  };

  const handlePasswordChange = (text) => {
    setNewPassword(text);
  };

  const handleGenderChange = (text) => {
    setNewGender(text);
  };

  const handleEmailChange = (text) => {
    setNewEmail(text);
  };

  const handleImagePicker = async () => {
    if (Constants.platform.ios) {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewProfilePicture(result.uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newName);
      formData.append('password', newPassword);
      formData.append('gender', newGender);
      formData.append('email', newEmail);
      if (newProfilePicture) {
        const localUri = await fetch(newProfilePicture);
        const filename = newProfilePicture.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        formData.append('profilePicture', { uri: localUri, name: filename, type });
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.put(`http://your-api-endpoint/users/${userId}`, formData, config);

      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleImagePicker}>
        {newProfilePicture
          ? <Image source={{ uri: newProfilePicture }} style={{ width: 100, height: 100 }} />
          : <Text>Select a profile picture</Text>
        }
      </TouchableOpacity>
      <TextInput
        placeholder="Enter new name"
        onChangeText={handleNameChange}
        value={newName}
      />
      <TextInput
        placeholder="Enter new password"
        onChangeText={handlePasswordChange}
        value={newPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Enter new gender"
        onChangeText={handleGenderChange}
        value={newGender}
      />
      <TextInput
        placeholder="Enter new email"
        onChangeText={handleEmailChange}
        value={newEmail}
        keyboardType="email-address"
      />
      <Button
        title="Save Changes"
        onPress={handleSubmit}
      />
    </View>
  );
}

export default PatientEditProfile
