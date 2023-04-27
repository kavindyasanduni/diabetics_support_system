import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker ,TouchableOpacity,Modal,ScrollView} from 'react-native';
import axios from 'axios';
import EditContentModal from './EditContentModal';

const DeleteContentFromKSC = () => {
  //for dropdown selection
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [selectedData, setSelectedData] = useState(null); //to edit purticualr data item
  // console.log(selectedOption);

  const options = ["workouts", "diet plans", "news and reaserach"];
  let clickedSubmit;
  let catchedPhoto;
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    toggleDropdown();
  };

    //end for dropdown selection

  const fetchData = async () => {
    // console.log("called");
    try{
    const response = await axios.get(`http://10.10.21.73:8082/getKInformationByCategory/${selectedOption}`);
    setTableData(response.data);
    console.log("Data captured: " + response.data);
    }catch(error){
      console.log(error);
      alert('An error occurred while fetching the data. Please try again later.');
    }
  }

  useEffect(() => {
    fetchData();
  }, [selectedOption]);
//get data to object
const kInformation = tableData.map((data , index) =>({
  id : data.kid,
  title : data.title,
  description : data.description,
  imgLink : data.img_url,

}));  
//to show spesific number of length
const maxDescriptionLength = 5;

// update the data 
const handleSave = async (newData) => {
  try {
    // Send the updated data to the backend API
    await axios.put(`http://192.168.8.104:8082/updateKInformation/${newData.id}`, newData);
    // Fetch the updated data from the backend API
    await fetchData();
    // Hide the edit modal
    setSelectedData(null);
  } catch (error) {
    console.log(error);
    alert('An error occurred while updating the data. Please try again later.');
  }
};


// end of update data code
// hide the modal
const handleCancel = () => {
  setSelectedData(null); // or any other code to close the modal
};
// end of hide the modal
  
  return (
    <View>
        <View style={styles.container}>

         {/* select catergory */}

         <View style={styles.description}>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={styles.dropdownButton}
          >
            <Text style={styles.dropdownButtonText}>
              {selectedOption || "Select an option"}
            </Text>
          </TouchableOpacity>
          <Modal visible={dropdownVisible} animationType="slide">
            <View style={styles.dropdownModal}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectOption(option)}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownItemText}>{option}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={toggleDropdown}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownItemText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <View style={styles.submitButtonCOntainer}>
          <View>
            <TouchableOpacity
              style={styles.button_s}
              onPress={() => {
                fetchData();
              }}
            >
              <Text style={styles.text}>Show data</Text>
            </TouchableOpacity>
          </View>
        </View>
      <ScrollView>
      <View style = {styles.aroundTable}>
      <View style={styles.tableContainer}>
      <View style={styles.tableRow}>
        <Text style={styles.tableCellHeader}>Id</Text>
        <Text style={styles.tableCellHeader}>Title</Text>
        <Text style={styles.tableCellHeader}>Description</Text>
        <Text style={styles.tableCellHeader}>Option</Text>


      </View>
        {/* Render table data here */}
        {kInformation.map((item, index) => (
          
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{item.id}</Text>
            <Text style={styles.tableCell}>{item.title.slice(0 , maxDescriptionLength)}</Text>
            <Text style={styles.tableCell}>{item.description.slice(0 , maxDescriptionLength)}</Text>
            <TouchableOpacity  onPress={() => setSelectedData(item)}>
              {/* <TouchableOpacity> */}
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      </View>
      </ScrollView>
      </View>

      {/* TO VIEW THE MODAL...BEFOR OPEN THE MODAL CHECK selectedData IS NULL OR NOT */}
      {selectedData && (
  <EditContentModal
    visible={Boolean(selectedData)}
    data={selectedData}
    onSave={handleSave}
    onCancel={handleCancel}
  />
)}
    </View>
  );
}

const styles = StyleSheet.create({
    // container: {
    //     justifyContent: "center",
    //     backgroundColor: "#FFF",
    //     marginTop: 10,
    //     width: 365,
    //     height: 612,
    //     left: 11,
    //     borderRadius: 32,
    //     ...Platform.select({
    //       ios: {
    //         shadowColor: "#000000",
    //         shadowOffset: {
    //           width: 0,
    //           height: 4,
    //         },
    //         shadowOpacity: 0.25,
    //         shadowRadius: 4,
    //       },
    //       android: {
    //         elevation: 5,
    //       },
    //     }),
    //   },

    description: {
        alignItems: "center",
        marginTop: 30,
    
        borderColor: "red",
      },
      //styles for drop down
  dropdownButton: {
    backgroundColor: "#fff",
    width: 250,
    padding: 10,
    justifyContent:'center',
    alignContent:'center',
    borderRadius: 10,
  },
  dropdownButtonText: {
    color: "#333",
    fontSize: 12,

    alignItems: "center",
  },
  dropdownModal: {
    backgroundColor: "#fff",
    margin: 20,
    marginTop: 200,
    // alignItems:'center',
    borderRadius: 10,
    padding: 10,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#be2edd",
  },
  //end of select catergory dropdown

  //styles for table
  aroundTable:{
    justifyContent: "center",
      backgroundColor: "#FFF",
      marginTop: 50,
      // width: 365,
      height: 550,
      marginLeft:10,
      marginRight:10,
      paddingLeft:30,
      paddingRight:10,
      paddingTop:10,
      // padding:15,
              borderRadius: 32,
      ...Platform.select({
        ios: {
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        },
        android: {
          elevation: 5,
        },
      }),
  },
  tableContainer: {
    // marginTop:50,
    marginTop:20,
    
    flex: 1,
    // paddingVertical: 8,
  },
  tableCellHeader: {
    flex: 1,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal:5,
    
  },
  tableRow: {
    flexDirection: 'row',
    // paddingLeft:10,
  },
  tableCell: {
    flex: 1,
    paddingVertical: 5
    // paddingHorizontal:5,
    // paddingRight:10,
  },
  //end of table styles

  //show data button styles
  submitButtonCOntainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    left: 85,
    marginTop: 20,
    width: 200,
  },
  button_s: {
    backgroundColor: "#1D11AD",
    padding: 5,
    borderRadius: 18,
    alignItems: "center",
    width: 110,
    height: 32,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  //end of button styles

});

export default DeleteContentFromKSC;