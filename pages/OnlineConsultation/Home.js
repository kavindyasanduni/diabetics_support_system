import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { GET } from "../Helper/Helper";

const Home = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState("all");
  const [docAndNut, setDocAndNut] = useState([]); //
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await GET("doctor");
      setDocAndNut(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleFilter = (type) => {
    setSelectedType(type);
  };
  console.log(docAndNut);

  const filteredData =
    selectedType === "all" //default
      ? docAndNut
      : docAndNut.filter((item) => item?.type === selectedType);

      //adding colors
  const getTypeTextStyle = (type) => {
    if (type === "nutritionist") {
      return { ...styles.type, color: "red" };
    } else if (type === "doctor") {
      return { ...styles.type, color: "blue" };
    } else {
      return styles.type;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333333" /> 
        <Text style={styles.profileText}>Loading...</Text>
      </View>
    );
  }
//isloading - false
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedType === "all" && styles.selectedButton,
          ]}
          onPress={() => handleFilter("all")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedType === "all" && styles.selectedButtonText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedType === "doctor" && styles.selectedButton,
          ]}
          onPress={() => handleFilter("doctor")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedType === "doctor" && styles.selectedButtonText,
            ]}
          >
            Doctors
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedType === "nutritionist" && styles.selectedButton,
          ]}
          onPress={() => handleFilter("nutritionist")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedType === "nutritionist" && styles.selectedButtonText,
            ]}
          >
            Nutritionists
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}> 
        {filteredData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardContainer}
            onPress={() => navigation.navigate("Details", { item })}
          >
            <Image source={{ uri: item?.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item?.name}</Text>
              <Text style={getTypeTextStyle(item?.type)}>{item?.type}</Text>
              {/* <Text style={styles.mobile}>{item?.mobile}</Text> */}
              <Text style={styles.cardDescription}>{item?.description}</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.callButton} //callbutton function
                onPress={() => {
                  Linking.openURL(`tel:${item?.mobile}`); //taking a call
                }}
              >
                <MaterialIcons name="call" size={24} color="white" /> 
                <Text style={styles.callButtonText}>Call</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 36,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 12,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E5E5E5",
  },
  selectedButton: {
    backgroundColor: "#333333",
  },
  buttonText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "bold",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 4,
    },
  },
  selectedButtonText: {
    color: "#FFFFFF",
  },
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "48%",
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#F8F8F8",
  },
  cardImage: {
    width: "100%",
    height: 160,
    resizeMode: "contain",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  type: {
    textTransform: "capitalize",
    fontSize: 14,
    marginBottom: 4,
  },
  mobile: {
    fontSize: 14,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#777777",
    height: 40,
  },
  callButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#28a745",
    alignSelf: "flex-end",
    margin: 12,
  },
  callButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
