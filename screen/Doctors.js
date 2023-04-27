import { padding } from '@mui/system';
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
 } from 'react-native';
import SearchBar from './Component/Searchbar.js';
import { ScrollView } from 'react-native-gesture-handler';


const DoctorsCard = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <SearchBar style={styles.ser} />
        <View style={styles.button1}>
          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d1.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t1}>Dr.Jack Alan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d2.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t2}>Dr.Bela </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d3.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t3}>Dr.Steven</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d4.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t4}>Dr.James</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d5.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t5}>Dr.Stela</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonC}>
            <Image
              source={require("../assets/images/d6.jpg")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={styles.t5}>Dr.Mike</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor:'#fff',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  buttonC:{
    backgroundColor: '#0E1879',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    paddingVertical:19,
    flexDirection: 'row'
    
    
  },
     t1:{color:'#fff',
        padding:10  ,
        fontSize:20,
},
     t2:{color:'#fff',
        padding:10  ,
        fontSize:20,
},
     t3:{color:'#fff',
        padding:10  ,
        fontSize:20,
},

     t4:{color:'#fff',
        padding:10  ,
        fontSize:20,
},

     t5:{color:'#fff',
        padding:10  ,
        fontSize:20,
},
        
  button1:{
    color:'red',
    paddingVertical:10,
    marginVertical:5,
  },
  button2:{
    color:"blue",
    paddingVertical:30,
  },
  button3:{
    color:"yellow",
  },
  ser:{
    position:'absolute',
    paddingTop:20

  },
});

export default DoctorsCard;