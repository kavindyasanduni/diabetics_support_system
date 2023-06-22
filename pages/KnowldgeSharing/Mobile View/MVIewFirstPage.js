import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator, Dimensions,Modal  } from 'react-native';
import { Card, Button } from 'react-native-paper';
import axios from 'axios';
import BASE_URL from '../../../config';
import { useEffect } from 'react';
import Icon from "react-native-vector-icons/AntDesign";

const MViewFirstPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('workouts');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const maxDescriptionLength = 50;
  const windowWidth = Dimensions.get('window').width;

  // Database retrieval function based on selectedCategory
  useEffect(() => {
    if (selectedCategory != null) {
      fetchData(selectedCategory);
    }
  }, [selectedCategory]); // Add selectedCategory as a dependency

  const fetchData = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/getKInformationByCategory/${category}`);
      const data = response.data;

      // Sort the data array based on created_date in descending order
      const sortedData = data.sort((a, b) => {
        return new Date(b.createdDate) - new Date(a.createdDate);
      });

      setData(sortedData);
      console.log('Data fetched');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data.Try again shortly')
      setLoading(false);
    }
  };

  const cardWidth = (windowWidth - 40) / 2; // Adjust the card width as needed
  const openModal = (article) => {
    setSelectedArticle(article);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedCategory === 'workouts' && styles.selectedButton]}
          onPress={() => setSelectedCategory('workouts')}
        >
          <Text style={styles.buttonText}>Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedCategory === 'diet plans' && styles.selectedButton]}
          onPress={() => setSelectedCategory('diet plans')}
        >
          <Text style={styles.buttonText}>Nutrition</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedCategory === 'news and reaserach' && styles.selectedButton]}
          onPress={() => setSelectedCategory('news and reaserach')}
        >
          <Text style={styles.buttonText}>News and Research</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading data...</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.cardsContainer}>
            {data.map((cardData, index) => (
              <View key={cardData.kid} style={styles.cardContainer}>
                <Card style={styles.cardStyles}>
                  <Card.Cover source={{ uri: cardData.img_url }} style={styles.cardImage} />
                  <Card.Title title={cardData.title} />
                  <Card.Content>
                    <Text>{cardData.description.slice(0, maxDescriptionLength)}</Text>
                  </Card.Content>
                  <Card.Actions>
                  {/* <Button style={styles.readMoreButton}> */}
                  <TouchableOpacity
                  onPress={() => openModal(cardData)}
                  activeOpacity={0.7}
                  >
                      <Text style={styles.readMoreButtonText}>Read More   
                    <Icon name="doubleright" size={12} color="#0984e3" style={{marginLeft:5}} />
                      
                      </Text> 

                    {/* </Button> */}
                    </TouchableOpacity>
                  </Card.Actions>
                </Card>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}>
        {selectedArticle && (
          <ScrollView style={styles.modalContentContainer}>
            <Image source={{ uri: selectedArticle.img_url }} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
            <Text style={styles.modalDescription}>{selectedArticle.description}</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Modal>
    </View>
  );
};

export default MViewFirstPage;

const styles = StyleSheet.create({
  cardImage: {
    height: 100, // Adjust the height as needed
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
  },
  selectedButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#0984e3',
    
   
  },
  buttonText: {
    fontSize: 16,
  },

  //styles for loading the button
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  cardContainer: {
    width: '48%',
    marginVertical: 5,
  },
  cardStyles: {
    backgroundColor: '#fff',
  },
  readMoreButton: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  readMoreButtonText: {
    fontSize: 13,
    // color: 'black',
    color: "#0984e3",
    paddingRight:10,
  },

  modalContentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#0984e3',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 50,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
