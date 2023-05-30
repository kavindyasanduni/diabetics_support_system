import React, { useEffect, useState, useContext } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import axios from "axios";

import { UserContext } from '../pages/UserContext';

const CustomDrawer = (props) => {
  const { userId } = useContext(UserContext);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (userId) {
      // Fetch user data from the backend API
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://192.168.8.167:8082/api/users/${userId}`);
      const userData = response.data;
      setProfilePictureUrl(userData.profilePictureUrl);
      setFirstName(userData.firstname);
      setLastName(userData.lastname);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
        <ImageBackground source={require('../assets/icon.png')} style={styles.headerBackground}>
          <Image source={profilePictureUrl ? { uri: profilePictureUrl } : require('../assets/icon.png')} style={styles.profilePicture} />
          <Text style={styles.userName}>{`${firstName} ${lastName}`}</Text>
        </ImageBackground>
        <View style={styles.drawerItemsContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.signOutContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: '#82006d',
  },
  headerBackground: {
    padding: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    left: 40,
  },
  userName: {
    fontSize: 16,
    left:30,
    color: '#82006d',
  },
  drawerItemsContainer: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingTop: 10,
  },
  signOutContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  signOutButton: {
    paddingVertical: 15,
    left:15
  },
  signOutText: {
    fontSize: 16,
  },
});

export default CustomDrawer;
