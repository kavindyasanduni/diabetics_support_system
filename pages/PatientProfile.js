// in your ProfileScreen.js file
/*
import React from 'react';
import { View, Text, Button } from 'react-native';

const PatientProfile = props => {
  const userId = 123; // replace with the actual user ID

  const handleEditProfile = () => {
    props.navigation.navigate('PatientEditProfile', {
      userId: userId,
      name: 'John Doe', // replace with the user's current name
      email: 'johndoe@example.com', // replace with the user's current email
      gender: 'Male', // replace with the user's current gender
      profilePicture: 'https://example.com/profile-picture.jpg', // replace with the user's current profile picture URL
    });
  };

  return (
    <View>
      <Text>This is the profile screen</Text>
      <Button title="Edit Profile" onPress={handleEditProfile} />
    </View>
  );
};

export default PatientProfile;*/

import react from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet ,SafeAreaView} from 'react-native'


const PatientHome = props =>{
    return(
        <View>
            <Text >Shakthi </Text>
        </View>
    )
}

export default PatientHome;
