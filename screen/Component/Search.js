/*import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import _ from "lodash";


function Search() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch data from your data source (e.g., an API or local storage)
    // Here, I'm assuming you have stored your data as an array of objects in AsyncStorage
    const storedData = await AsyncStorage.getItem("data");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
      setFilteredData(parsedData);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query) {
      // Filter the data based on the search query
      const filtered = _.filter(data, (item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      // Sort the filtered data in alphabetical order
      const sorted = _.sortBy(filtered, (item) => item.name.toLowerCase());

      setFilteredData(sorted);
    } else {
      // If the search query is empty, show all the data
      setFilteredData(data);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
export default Search;*/
