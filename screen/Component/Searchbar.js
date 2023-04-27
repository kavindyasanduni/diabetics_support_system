import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ onSubmit }) => {
  const [term, setTerm] = useState('');

  const handleSearch = () => {
    onSubmit(term);
  };

  return (
    <View style={styles.searchBar}>
      <Feather name="search" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search Doctor"
        value={term}
        onChangeText={setTerm}
        onEndEditing={handleSearch}
      />
      </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 25,
    marginHorizontal: 15,
    marginTop: 50,
    marginBottom: 10,
  },
  searchIcon: {
    fontSize: 30,
    marginHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
  },
  button: {
    marginRight: 10,
  },
  
});

export default SearchBar;
