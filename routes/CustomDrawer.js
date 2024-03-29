import React, { useEffect, useState, useContext } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useFocusEffect,useIsFocused } from '@react-navigation/native';
import axios from "axios";
import BASE_URL from "../config";

import { UserContext } from '../pages/UserContext';

const CustomDrawer = (props) => {
  const { userId } = useContext(UserContext);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const isDrawerFocused = useIsFocused();

  useEffect(() => {
    if (userId && isDrawerFocused) {
      fetchUserData();
    }
  }, [userId, isDrawerFocused]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/${userId}`);
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
          <DrawerItemList {...props}  activeTintColor="#FF0000" />
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
    backgroundColor: '#1D11AD',
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
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  signOutButton: {
    paddingVertical: 10,
    left:15,
    width: '100%',
  },
  signOutText: {
    fontSize: 16,
  },
});

export default CustomDrawer;
