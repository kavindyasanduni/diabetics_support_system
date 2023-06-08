import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid,Alert } from 'react-native';

const NutritionistCalling = () => {
  const [patientName, setPatientName] = useState('');
  
  const handleAcceptCall = () => {
    // Logic for accepting the call
    console.log('Call accepted');
  };
  
  const handleRejectCall = () => {
    // Logic for rejecting the call
    console.log('Call rejected');
  };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Patient Name: {patientName}</Text>
      <Button title="Accept Call" onPress={handleAcceptCall} />
      <View style={{ marginVertical: 20 }} />
      <Button title="Reject Call" onPress={handleRejectCall} />
  </View>
  );
};

export default NutritionistCalling;
