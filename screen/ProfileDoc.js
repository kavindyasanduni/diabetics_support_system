import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity ,StyleSheet} from 'react-native';

import axios from "axios";


const ProfileDoc = (props) => {
  const [AppoinmentDateandDay, setAppinmentDateandDay] = useState("");

  const { id, name } = props.route.params;
  console.log(name);
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    if (name === "doctor") {
      fetchDataD();
    } else if (name === "nutritionist") {
      fetchDataN();
    }
    // fetchDataN();
  }, []);

  const fetchDataD = async () => {
    try {
      const response = await axios.get(`http://192.168.8.100:8082/getdoctordatabyid/${id}`);
      setDoctorData(response.data);
      console.log('Data successfully fetched', response.data);
    } catch (error) {
      console.log(error);
      alert('An error occurred while fetching the data. Please try again later.');
    }
  };

  const fetchDataN = async () => {
    try {
      const response = await axios.get(`http://192.168.8.100:8082/getnutritionist/${id}`);
      if (response.data) {
        setDoctorData(response.data);
      }
      console.log('Data successfully fetched');
      // setDoctorData(response.data)
      // console.log('Data successfully fetched:', response.data);
    } catch (error) {
      console.log(error);
      alert('An error occurred while fetching the data. Please try again later.');
    }
  };



  const click = () => {};

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.HeadContainer}>
          <Image
            source={require("../assets/images/d1.jpg")}
            style={styles.photoButton}
          />
          {/* <Text style={styles.DocName}>Dr.Jack Alan</Text> */}
          <Text style={styles.DocName}>
            DR.{doctorData.fname + " " + doctorData.lname}
          </Text>

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

        {/* <View style={styles.DescContainer}>
          <Text style={{ fontSize: 20 }}>Available Time</Text>
          <Text style={styles.input}>{doctorData.a_date}</Text>

          <Text style={styles.input}>Status</Text>

          <Text style={styles.input}>{doctorData.a_time}</Text>

          <View style={styles.input}>
            <TouchableOpacity style={styles.button} onPress={click}>
              <Text style={styles.buttonText}>Book Now </Text>
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={styles.DescContainer}>
        {doctorData.a_date && doctorData.a_date.map((date, index) => (    
          <View key={index}>
          <Text style={{ fontSize: 20 ,paddingTop:20 }}>Available Time</Text> 
              <Text style={styles.input}>{date}</Text>
              <Text style={styles.input}>Status</Text>
              <Text style={styles.input}>{doctorData.a_time[index]}</Text>
              <View style={styles.input}>
                <TouchableOpacity style={styles.button} onPress={click}>
                  <Text style={styles.buttonText}>Book Now </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* <View style={styles.DescContainer}>
          <Text style={{ fontSize: 20 }}>Available Time</Text>
          <Text style={styles.input}>{doctorData.a_date}</Text>

          <Text style={styles.input}>Status</Text>

          <Text style={styles.input}>{doctorData.a_time}</Text>

          <View style={styles.input}>
            <TouchableOpacity style={styles.button} onPress={click}>
              <Text style={styles.buttonText}>Book Now </Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  HeadContainer: {
    marginBottom: 25,
    backgroundColor: "#1D11AD",
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
    // marginTop: 20,
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
    backgroundColor: "#3498db",
    height: 30,
    width: 100,
    // marginLeft: 100,
    borderRadius: 10,
    marginRight: "auto",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 16,
    marginTop: 3,
  },
});

export default ProfileDoc;
