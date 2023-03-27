import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';



const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    // handle search logic here
  };

  return (
    <View style={styles.container}>
  
      <TextInput
        style={styles.input}
        placeholder="Search Doctor"
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    padding: 5,
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 70,
  },
  input: {
    fontSize: 16,
    padding: 5,
  },
 
});

export default SearchBar;
