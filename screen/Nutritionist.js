import React, { useState, useEffect } from "react";
import { Card, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
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
import axios from "axios";
import BASE_URL from "../config.js";

const NutritionistCard = (props) => {
  const [nutritionistData, setNutritionistData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getallnutritionist`);
      setNutritionistData(response.data);
      setFilteredData(response.data); // Set initial filtered data as all nutritionists
      console.log("Data successfully fetched" + response.data);
    } catch (error) {
      console.log(error);
      alert("An error occurred while fetching the data. Please try again later.");
    }
  };

  const handleSearch = (searchTerm) => {
    const filteredNutritionists = nutritionistData.filter(
      (nutritionist) =>
        nutritionist.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nutritionist.lname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredNutritionists);
  };

  const name = "nutritionist";

  return (
    <View style={styles.container}>
      <SearchBar onSubmit={handleSearch} />
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {filteredData.map((data, index) => (
          <View key={index} style={styles.cardContainer}>
            <Card style={styles.cardStyles}>
              <Card.Cover
                source={require("../assets/VectorArt/nut1.png")}
                style={styles.cardImage}
              />
              <Card.Title
                title={data.fname + " " + data.lname}
                titleStyle={styles.titleText}
              />
              <Card.Content>
                <Text style={styles.descriptionText}>{data.description}</Text>
              </Card.Content>
              <Card.Actions>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("DoctorProfile", {
                      id: data.nid,
                      name: name,
                      description: data.description,
                    })
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.readMoreButtonText}>
                    Book Now
                    <Icon
                      name="doubleright"
                      size={12}
                      color="#0984e3"
                      style={{ marginLeft: 5 }}
                    />
                  </Text>
                </TouchableOpacity>
              </Card.Actions>
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
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

  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  cardContainer: {
    width: "48%",
    marginVertical: 10,
  },
  cardStyles: {
    backgroundColor: "#fff",
  },
  readMoreButton: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  readMoreButtonText: {
    fontSize: 13,
    // color: 'black',
    color: "#0984e3",
    paddingRight: 10,
  },
  cardImage: {
    height: 100, // Adjust the height as needed
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  descriptionText: {
    fontWeight: "bold", // Add desired font weight
    color: "#435B66", // Add desired color
  },
  titleText: {
    fontWeight: "bold", // Add desired font weight
    color: "#2c3e50", // Add desired color
  },
});

export default NutritionistCard;
