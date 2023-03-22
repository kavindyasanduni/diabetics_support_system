import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import PatientHome from './PatientHome';
import DoctorDashboard from './DoctorDashboard';
import NutritionistDashboard from './NutritionistDashboard';

const RoleIdentify =props => {
  const [role, setRole] = useState('');

  const renderDashboard = () => {
    switch (role) {
      case 'patient':
        return <PatientHome />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'nutritionist':
        return <NutritionistDashboard />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Select Your Role:</Text>
      <Button title="Patient" onPress={() => setRole('patient')} />
      <Button title="Doctor" onPress={() => setRole('doctor')} />
      <Button title="Nutritionist" onPress={() => setRole('nutritionist')} />
      {renderDashboard()}
    </View>
  );
};

export default RoleIdentify;
