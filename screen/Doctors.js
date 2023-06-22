import { padding } from '@mui/system';
import React, { useState, useEffect } from "react";
import { Card, Button } from 'react-native-paper';
import Icon from "react-native-vector-icons/AntDesign";

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

    // <SafeAreaView>
    <View style={styles.container}>

        <SearchBar style={styles.ser} />
      <ScrollView contentContainerStyle={styles.cardsContainer}>

          {doctorsData.map((data, index) => (
            // <TouchableOpacity style={styles.buttonC} 
            // key={index}
            //   onPress={() => props.navigation.navigate("DoctorProfile", { id: data.did  , name :name})}

            // >
            //   <Image
            //     source={require("../assets/images/d1.jpg")}
            //     style={{ width: 70, height: 70 }}
            //   />
            //   <Text
            //     style={styles.t1}
            //     // onPress={() => props.navigation.navigate("DoctorProfile" ,  { id: data.did })}
            //   >
            //     {data.fname +" "+ data.lname}
            //   </Text>
            // </TouchableOpacity>
            <View key={index} style={styles.cardContainer}>
                <Card style={styles.cardStyles}>
                  <Card.Cover source={require("../assets/images/d1.jpg")} style={styles.cardImage} />
                  <Card.Title title={data.fname +" "+ data.lname} />
                  <Card.Content>
                    <Text>{data.description}</Text>
                  </Card.Content>
                  <Card.Actions>
                  {/* <Button style={styles.readMoreButton}> */}
                  <TouchableOpacity
                  onPress={() => props.navigation.navigate("DoctorProfile", { id: data.did  , name :name , description : data.description})}
                  activeOpacity={0.7}
                  >
                      <Text style={styles.readMoreButtonText}>Book Now   
                    <Icon name="doubleright" size={12} color="#0984e3" style={{marginLeft:5}} />
                      
                      </Text> 

                    {/* </Button> */}
                    </TouchableOpacity>
                  </Card.Actions>
                </Card>
              </View>
          ))}

      </ScrollView>
        
        </View>
    // </SafeAreaView>
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

  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  cardContainer: {
    width: '48%',
    marginVertical: 10,
  },
  cardStyles: {
    backgroundColor: '#fff',
  },
  readMoreButton: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  readMoreButtonText: {
    fontSize: 13,
    // color: 'black',
    color: "#0984e3",
    paddingRight:10,
  },
  cardImage: {
    height: 100, // Adjust the height as needed
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },

});

export default DoctorsCard;