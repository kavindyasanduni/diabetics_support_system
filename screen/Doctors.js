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
import BASE_URL from '../config.js';


const DoctorsCard = (props) => {

  const [doctorsData , setDoctorData] = useState([]); //data save 

  useEffect(() => {
      fetchData();
    }, []);  
  
  //fetch the data
  const fetchData = async () =>{
    try { 
      const response = await axios.get(`${BASE_URL}/getdoctordata`);
      setDoctorData(response.data);
      console.log("Data successfully fetched" + response);

    }catch (error){
      console.log(error);
      alert(
        "An error occurred while fetching the data. Please try again later."
      );

    }
  }

  const name = "doctor";




  return (
    //using modal do this

    <SafeAreaView>
      <ScrollView>
        <SearchBar style={styles.ser} />
        <View style={styles.button1}>
          {doctorsData.map((data, index) => (
            <TouchableOpacity style={styles.buttonC} 
            key={index}
              onPress={() => props.navigation.navigate("DoctorProfile", { id: data.did  , name :name})}

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
  buttonC: {
    backgroundColor: "#21a9ad",
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 16,
    paddingVertical: 20,
    flexDirection: "row",
    borderRadius: 10,
  },
  t1: { color: "#fff", padding: 10, fontSize: 20 },
  t2: { color: "#fff", padding: 10, fontSize: 20 },
  t3: { color: "#fff", padding: 10, fontSize: 20 },

  t4: { color: "#fff", padding: 10, fontSize: 20 },

  t5: { color: "#fff", padding: 10, fontSize: 20 },
});

export default DoctorsCard;