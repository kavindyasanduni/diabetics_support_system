import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  ScrollView

} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


const AddProfile = ({ photo }) => {
  const [AppoinmentDateandDay, setAppinmentDateandDay] = useState("");
  //const [age, setAge] = useState("");
  //const [sex, setSex] = useState("");
  //const [category, setCategory] = useState("");
  //const [selectedPhoto, setSelectedPhoto] = useState(photo);

  const click =()=> {

  }


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.HeadContainer}>
          <Image
            source={require("../assets/images/d1.jpg")}
            style={styles.photoButton}
          />
          <Text style={styles.DocName}>Dr.Jack Alan</Text>
          <Text style={styles.Desc}>Diabetologists</Text>
          <Text style={styles.Desc}>BioNeu Hospital</Text>
        </View>

        <View style={styles.DescContainer}>
          <Text style={{ fontSize: 20 }}>Available Time</Text>
          <Text style={styles.input}>Appoinment Date and day</Text>

          <Text style={styles.input}>Status</Text>

          <Text style={styles.input}>Time</Text>

          <Text style={styles.input}>Clik here to make Appointment</Text>
        </View>

        <View style={styles.DescContainer}>
          <Text style={{ fontSize: 20 }}>Available Time</Text>
          <Text style={styles.input}>Appoinment Date and day</Text>

          <Text style={styles.input}>Status</Text>

          <Text style={styles.input}>Time</Text>

          <View style={styles.input}>
            <TouchableOpacity style={styles.button} onPress={click}>
              <Text style={styles.buttonText}>Book Now </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.DescContainer}>
          <Text style={{ fontSize: 20 }}>Available Time</Text>
          <Text style={styles.input}>Appoinment Date and day</Text>

          <Text style={styles.input}>Status</Text>

          <Text style={styles.input}>Time</Text>


          <View style={styles.input}>
            <TouchableOpacity style={styles.button} onPress={click}>
              <Text style={styles.buttonText}>Book Now </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  HeadContainer: {
    marginBottom: 25,
    backgroundColor: "#0E1879",
    width: "100%",
    padding: 10,
    borderRadius: 0,
  },
  DocName: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 15,
    marginLeft: 32,
    color: "#fff",
  },
  Desc: {
    color: "gray",
    fontSize: 15,
    marginLeft: 32,
  },

  photoButton: {
    backgroundColor: "#eee",
    height: 180,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 60,
    marginBottom: 5,
    marginRight: 0,
    padding: 10,
  },
  photoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#aaa",
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  DescContainer: {
    padding: 20,
    
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    // borderRadius: 5,
    padding: 10,
    backgroundColor: "#F9F5EB",
    // marginBottom: 20,
    color: "gray",
  },

  button: {
    backgroundColor: "#0E1879",
    height: 30,
    width: 100,
    // marginLeft: 100,
    borderRadius: 10,
    marginRight:"auto"

  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 16,
    marginTop: 3,
  },
});

export default AddProfile;
