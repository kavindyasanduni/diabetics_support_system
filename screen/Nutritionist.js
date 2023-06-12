import { padding } from "@mui/system";
// import React from "react";
import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import SearchBar from "./Component/Searchbar.js";
import { ScrollView } from "react-native-gesture-handler";
import axios from 'axios';



  const NutritionistCard = (props) => {
    const [nutritionistData , setNutritionistData] = useState([]); //data save 

    useEffect(() => {
        fetchData();
      }, []);  
    
    //fetch the data
    const fetchData = async () =>{
      try { 
        const response = await axios.get(`http://192.168.8.100:8082/getallnutritionist`);
        setNutritionistData(response.data);
        console.log("Data successfully fetched" + response.data);
  
      }catch (error){
        console.log(error);
        alert(
          "An error occurred while fetching the data. Please try again later."
        );
  
      }
    }

    const name = "nutritionist";
  


  return (
    <SafeAreaView>
      <ScrollView>
        <SearchBar style={styles.ser} />
        <View style={styles.button1}>
        {nutritionistData.map((data, index) => (
            <TouchableOpacity style={styles.buttonC} 
            key={index}
              onPress={() => props.navigation.navigate("DoctorProfile", { id: data.nid , name: name })}

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
          {/* <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d1.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t1}>Dr</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d2.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t2}>Dr </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d3.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t3}>Dr.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d4.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t4}>Dr</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d5.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t5}>Dr.Silva</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  t1: { color: "#fff", padding: 10, fontSize: 20 },
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
    backgroundColor: "#0E1879",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    paddingVertical: 19,
    flexDirection: "row",
  },
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

export default NutritionistCard;
