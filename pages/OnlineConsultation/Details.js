import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Details = ({ route, navigation }) => {
  const { item } = route.params; //params= data

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.image }} style={styles.image} />
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={40} color="black" />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.type}>{item?.type}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}> 
          <Text style={styles.mobileTitle}>Mobile : </Text>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => {
              Linking.openURL(`tel:${item?.mobile}`);
            }}
          >
            <Text style={styles.mobile}>{item?.mobile}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{item?.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 16,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  type: {
    textTransform: "capitalize",
    fontSize: 16,
    color: "#777777",
    marginBottom: 8,
  },
  mobileTitle: {
    fontSize: 16,
    color: "#777777",
    marginBottom: 8,
  },
  mobile: {
    fontSize: 16,
    color: "#00ff",
    marginBottom: 8,
    textDecorationLine: "underline",
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 0,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});

export default Details;
