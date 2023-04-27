import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  
} from "react-native";

const Select = () => {
  const [Doctor, setDoctor] = useState("");
  const [Specialty, setSpecialty] = useState ("");
  const [Date, setDate] = useState("");

 
    return (
      
    <View style={styles.container}>
      <Text style={styles.input1}>Chanel Doctor-BioNeu Hospital</Text>
      <TextInput
        style={styles.input}
        placeholder="Doctor"
        value={Doctor}
        onChangeText={setDoctor}
      />


      <TextInput
        style={styles.input}
        placeholder="Specialty"
        value={Specialty}
        onChangeText={setSpecialty}
      />

      <TextInput
        style={styles.input}
        placeholder=" Select Date"
        keyboardType="numeric"
        value={Date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.button} onPress>
        <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button1} onPress>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
    paddingTop:1,
    marginBottom:20,
    
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 30,
    marginTop: 50,
  },
  input1: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 100,
    marginLeft:40,
    
  },
  button: {
    backgroundColor: "#0E1879",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight:200,
    

  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  button1: {
    backgroundColor: "#0E1879",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft:200,
    marginTop:-42,
  },
  button1Text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Select;
