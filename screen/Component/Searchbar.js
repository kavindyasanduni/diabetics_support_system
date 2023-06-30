import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({ onSubmit }) => {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    const sortedTerm = term.trim();
    onSubmit(sortedTerm);
  };

  return (
    <View style={styles.searchBar}>
      <Feather name="search" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={term}
        onChangeText={setTerm}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};






const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0EEEE",
    height: 45,
    borderRadius: 25,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 5,
  },
  searchIcon: {
    fontSize: 30,
    marginHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
  },
});

export default SearchBar;
