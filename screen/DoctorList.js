import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import SearchBar from './screen/Component/Searchbar';



function DoctorList() {

  const[ SearchQuery,setSearchQuery]=useState('');
  const [name, setName] = useState('');
  const [PhoneNo, setPhoneNo] = useState('');
  const [Email, setEmail] = useState('');
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [AvailableTime, setAvailableTime] = useState('');
 

  const handleSearch = (text) => {
    setSearchQuery(text);
    // implement search functionality here
  };

  const handleChoosePhoto = () => {
    // handle choose photo logic here
  };

  return (
    <View style={styles.container}>
    <View style={styles.searchContainer}></View>
    
    
    <TextInput
        style={styles.input}
        placeholder=" "
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder=""
        keyboardType="numeric"
        value={PhoneNo}
        onChangeText={setPhoneNo}
      />
      <TextInput
        style={styles.input}
        placeholder=""
        value={Email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder=""
        value={UserName}
        onChangeText={setUserName}
      />
        <TextInput
        style={styles.input}
        placeholder=""
        value={Password}
        onChangeText={setPassword}
      />
        <TextInput
        style={styles.input}
        placeholder=""
        value={Password}
        onChangeText={setPassword}
      />
      
       </View>
       
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:100,
  },
  searchContainer:{
    backgroundColor:'#fff',
    borderRadius:5,
    marginBottom:50,
    height:30
    
    
},
searchIcon:{
    marginRight:10,

},

SearchInput:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    borderWidth:1,
    margin:10,
    height:30,
    borderWidth:1,
    marginTop:15,
    marginBottom:30,
    marginRight:8,
    marginLeft:1,
    borderColor:"#c0c0c0"

},
input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    padding: 30,
    paddingLeft:15,
    marginBottom: 10,
  },
    
     
 
});

export default DoctorList;