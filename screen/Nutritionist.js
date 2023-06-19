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
import BASE_URL from "../config.js";



  const NutritionistCard = (props) => {
    const [nutritionistData , setNutritionistData] = useState([]); //data save 

    useEffect(() => {
        fetchData();
      }, []);  
    
    //fetch the data
    const fetchData = async () =>{
      try { 
        const response = await axios.get(`${BASE_URL}/getallnutritionist`);
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
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.t1}>Dr.Tharindu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d2.jpg")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.t2}>Dr.Alen </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d6.jpg")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.t3}>Dr.harry</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d4.jpg")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.t4}>Dr.Perera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d5.jpg")}
              style={{ width: 50, height: 50 }}
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
    backgroundColor: "#21a9ad",
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 16,
    paddingVertical: 20,
    flexDirection: "row",
    borderRadius: 10,

    // Box Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  t1: { color: "#fff", padding: 10, fontSize: 20 },
  t2: { color: "#fff", padding: 10, fontSize: 20 },
  t3: { color: "#fff", padding: 10, fontSize: 20 },
  t4: { color: "#fff", padding: 10, fontSize: 20 },
  t5: { color: "#fff", padding: 10, fontSize: 20 },
});

export default NutritionistCard;
