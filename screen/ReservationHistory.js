import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Table  () {
  return (
    <View style={styles.container}>
    
    <Text style={styles.input1}>Dr.Marry Adams</Text>
      <View style={styles.row}>
        <Text style={styles.header}>Name</Text>
        <Text style={styles.header}>Date</Text>
        <Text style={styles.header}>Time</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>P1</Text>
        <Text style={styles.cell}>02.5.2023</Text>
        <Text style={styles.cell}> 5.50</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>P2</Text>
        <Text style={styles.cell}>02.5.2023</Text>
        <Text style={styles.cell}>7.00</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>P3</Text>
        <Text style={styles.cell}>02.5.2023</Text>
        <Text style={styles.cell}>6.30</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>P4</Text>
        <Text style={styles.cell}>02.5.2023</Text>
        <Text style={styles.cell}>4.30</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>P5</Text>
        <Text style={styles.cell}>02.5.2023</Text>
        <Text style={styles.cell}>7.30</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>P6</Text>
        <Text style={styles.cell}>02.5.2023</Text>
        <Text style={styles.cell}>7.45</Text>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
  
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderColor:'Black',
    borderStyle:'Solid',
    marginTop:100,
    marginLeft:15,
    marginRight:15,
    marginBottom:10,
    
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    
  },
  header: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  input1:{
    marginBottom:60,
        fontSize:18,
        fontWeight:'bold',
        paddingTop:40,
  }
});

export default Table;
