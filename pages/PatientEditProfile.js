import React, { useState, useEffect } from 'react';
import { View, TextInput,Text, Button, StyleSheet ,TouchableOpacity,Image,Alert} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

import { storage } from "../firebaseconfig"; // import the initialized storage object from firebaseConfig

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'; // import the SDKs you need

const storageRef = ref(storage); // create a reference to the root of your storage // ====I edit this======================== //


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
  const [profilePicture, setProfilePicture] = useState(null);


  useEffect(() => {
    axios.get(`http://192.168.8.167:8082/api/users/4`)
      .then(response => {
        setUser(response.data);
        setFirstName(response.data.firstname);
        setLastName(response.data.lastname);
        setEmail(response.data.email);
        setNic(response.data.nic);
        setProfilePicture({ uri: response.data.profilePictureUrl });
      })
      .catch(error => console.error(error));
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }
  
    const updatedUser = { ...user, firstname: firstName, lastname: lastName, email: email, nic: nic, password: newPassword, };
  
    if (profilePicture) {
      const fileExtension = profilePicture.uri.split(".").pop();
      const storageRef = ref(storage, `profilePictures/${user.id}.${fileExtension}`);
      const response = await fetch(profilePicture.uri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob); 
      // Update the profile picture URL in the updated user object
      updatedUser.profilePictureUrl = await getDownloadURL(storageRef);
    }
    try {
      const response = await axios.put(`http://192.168.8.167:8082/api/users/4`, updatedUser);
      if (response.status === 200) {
        setUser(response.data);
        setIsEditing(false);
      } else {
        Alert.alert("Error saving user");
      }
    } catch (error) {
      Alert.alert("Error saving user: " + error.message);
    }
  };
  
  

  const handleCancel = () => {
    setIsEditing(false);
    setFirstName(user.firstname);
    setLastName(user.lastname);
    setEmail(user.email);
    setNic(user.nic);
  };

  const handleProfilePicturePress = async () => {
    // Get permission to access the user's photos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
  
    // Show the image picker to the user
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    
    const imageUri = result.assets[0].uri;
    if (!result.canceled) {
      
      setProfilePicture({ uri: imageUri });

    }else {
      setProfilePicture(null);
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleProfilePicturePress}>
      <View style={styles.profilePictureContainer}>
        {profilePicture ? (
          <Image style={styles.profilePicture} source={{ uri: profilePicture.uri }} />
        ) : (
          <Image style={styles.profilePicture} source={{ uri: user.profilePictureURL }} />
        )}
      </View>
      </TouchableOpacity>
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
      {isEditing ? (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        <Text style={styles.editbuttonText}>Edit</Text>
      </TouchableOpacity>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, // Add margin top to create space
  },
  profilePictureContainer: {
    marginBottom: 20,
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
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  button: {
    backgroundColor: '#7a42f4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'white',
  },
  editbuttonText: {
    color: 'white',
    fontSize: 16,
  },
  
});

export default PatientEditProfile;
