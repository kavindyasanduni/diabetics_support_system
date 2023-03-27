
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import AddUserDetails from './screen/DoctorDetails';
import SeeReservation from './screen/SeeReservation';
import UpdateUserDetails from './screen/UpdateDoctor';
import UpdateUserDetails2 from './screen/UpdateNutritionist';
import Table from './screen/ReservationHistory';
import DoctorList from './screen/DoctorList';
import SearchBar from './screen/Component/Searchbar';


export default function App(){
  return(
    
    <DoctorList/>
  )

};



