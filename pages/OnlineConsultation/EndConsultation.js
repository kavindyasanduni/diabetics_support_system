import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const EndConsultation = () => {
  return (
    <ImageBackground
      //source={require('../assets/images/ImageBackground.jpg')} // Replace with the actual path to your background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.text}>Have a healthy day!</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#050505', // Optional: Customize the text color
  },
});

export default EndConsultation;
