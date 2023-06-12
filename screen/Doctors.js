import { padding } from '@mui/system';
import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
 } from 'react-native';
import SearchBar from './Component/Searchbar.js';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
// import { useEffect } from 'react';


const DoctorsCard = (props) => {

  const [doctorsData , setDoctorData] = useState([]); //data save 

  useEffect(() => {
      fetchData();
    }, []);  
  
  //fetch the data
  const fetchData = async () =>{
    try { 
      const response = await axios.get(`http://192.168.8.101:8082/getdoctordata`);
      setDoctorData(response.data);
      console.log("Data successfully fetched" + response.data);

    }catch (error){
      console.log(error);
      alert(
        "An error occurred while fetching the data. Please try again later."
      );

    }
  }



  return (
    //using modal do this

    <SafeAreaView>
      <ScrollView>
        <SearchBar style={styles.ser} />
        <View style={styles.button1}>
          {doctorsData.map((data, index) => (
            <TouchableOpacity style={styles.buttonC} 
            key={index}
              onPress={() => props.navigation.navigate("DoctorProfile", { id: data.did })}

            >
              <Image
                source={require("../assets/images/d1.jpg")}
                style={{ width: 70, height: 70 }}
              />
              <Text
                style={styles.t1}
                // onPress={() => props.navigation.navigate("DoctorProfile" ,  { id: data.did })}
              >
                {data.fname +" "+ data.lname}
              </Text>
            </TouchableOpacity>
          ))}

        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  buttonC: {
    backgroundColor: "#1D11AD",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    paddingVertical: 19,
    flexDirection: "row",
  },
  t1: { color: "#fff", padding: 10, fontSize: 20 },
  t2: { color: "#fff", padding: 10, fontSize: 20 },
  t3: { color: "#fff", padding: 10, fontSize: 20 },

  t4: { color: "#fff", padding: 10, fontSize: 20 },

  t5: { color: "#fff", padding: 10, fontSize: 20 },

  button1: {
    color: "red",
    paddingVertical: 10,
    marginVertical: 5,
  },
  button2: {
    color: "blue",
    paddingVertical: 30,
  },
  button3: {
    color: "yellow",
  },
  ser: {
    position: "absolute",
    paddingTop: 20,
  },
});

export default DoctorsCard;