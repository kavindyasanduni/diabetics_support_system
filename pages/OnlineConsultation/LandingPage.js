import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const LandingPage = ({ navigation }) => {
  const handleButtonClick = () => {
    // Navigate to another screen
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subTitle}>Join with US & Enjoy Healthy Life</Text>
      <Button
        style={styles.button}
        title="Get Started"
        onPress={handleButtonClick}
        color={"#189AB4"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#fff"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default LandingPage;
