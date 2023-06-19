import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import axios from "axios";
import BASE_URL from "../config";

const Reservation = () => {
  const [pName, setPname] = useState("");
  const [pNo, setPNo] = useState("");
  const [gName, setGName] = useState("");
  const [dName, setDname] = useState("");
  const [aDate, setAdate] = useState("");
  const [rType, setRtype] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async () => {
    axios
      .post(`${BASE_URL}/addReservation`, {
        r_type: rType,
        p_name: pName,
        phone_no: pNo,
        date: aDate,
        time: time,
      })
      .then(function (response) {
        console.log("Successfully added to database" , response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}> Book an Appointment</Text>
      <TextInput
        placeholder="Enter reservation type"
        style={styles.input}
        onChangeText={setRtype}
        value={rType}
      />
      <TextInput
        placeholder="Enter Patient Name"
        style={styles.input}
        onChangeText={setPname}
        value={pName}
      />
      <TextInput
        placeholder="Enter Phone Number"
        style={styles.input}
        onChangeText={setPNo}
        value={pNo}
      />
      <TextInput
        placeholder="Enter Guardian Name"
        style={styles.input}
        onChangeText={setGName}
        value={gName}
      />
      <TextInput
        placeholder="Enter Doctor Name"
        style={styles.input}
        onChangeText={setDname}
        value={dName}
      />
      <TextInput
        placeholder="Enter Appointment Date"
        style={styles.input}
        onChangeText={setAdate}
        value={aDate}
      />

      <TextInput
        placeholder="Enter Appointment time"
        style={styles.input}
        onChangeText={setTime}
        value={time}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}> 
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button1}>
        <Text style={styles.button1Text}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0EEE",
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 35,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginLeft: 200,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button1: {
    backgroundColor: "#EA2027",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginRight: 200,
    marginTop: -40,
    marginBottom: 20,
  },
  button1Text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Reservation;
