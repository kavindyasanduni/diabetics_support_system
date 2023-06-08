import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,TouchableOpacity ,Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const DoctorConsultationScreen = (props) => {
  const [patientName, setPatientName] = useState('');
  const [consultationMessage, setConsultationMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState('doctor');
  const handleValueChange = (itemValue) => {
    setSelectedRole(itemValue);
    // You can perform any additional logic or save the value in a database here
  };

  const handleConsultationRequest = () => {

    if (selectedRole == 'doctor'){
      console.log("doctr");
      props.navigation.navigate("DoctorTable");
    }else{
      console.log("nu");
      props.navigation.navigate("NutritionistTable");
    }
    // axios
    //   .post('https://your-backend-server.com/consultation', {
    //     patientName: patientName,
    //     message: consultationMessage,
    //     role: selectedRole,
    //   })
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  };

  return (
    <View style={styles.container}>
      {/*<Picker
        selectedValue={selectedRole}
        style={styles.input}
        onValueChange={(itemValue) => setSelectedRole(itemValue)}
      >
        <Picker.Item label="Doctor" value="doctor" />
        <Picker.Item label="Nutritionist" value="nutritionist" />
  </Picker>*/}
  <Picker
        selectedValue={selectedRole}
        style={styles.input}
        onValueChange={handleValueChange}
      >
        <Picker.Item label="Doctor" value="doctor" />
        <Picker.Item label="Nutritionist" value="nutritionist" />
      </Picker>
      {/*<TextInput
        style={styles.input}
        placeholder="Patient Name"
        value={patientName}
        onChangeText={text => setPatientName(text)}
  />*/}
      <TextInput
        style={styles.input}
        placeholder="Consultation Message"
        value={consultationMessage}
        onChangeText={text => setConsultationMessage(text)}
      />
      <Button title="Request Consultation" onPress={handleConsultationRequest} />
      {/* ()=> props.navigation.navigate("DoctorTable") */}
      {/* <TouchableOpacity
              style={styles.button}
              onPress={() =>
                props.navigation.navigate("DoctorTable")
              }
            >
              <ButtonD title ="Update Knowledge Sharing center"  navigation="knowladgesharingdashbord" />
              <Text >
                Update or Delete data in web
              </Text>
            </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default DoctorConsultationScreen;
