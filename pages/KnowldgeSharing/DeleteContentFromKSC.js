import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert
} from "react-native";
import axios from "axios";
import EditContentModal from "./EditContentModal";
import { storage } from "../../firebaseconfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { Picker } from '@react-native-picker/picker';
import BASE_URL from "../../config";
import moment from 'moment';


const DeleteContentFromKSC = () => {
  //for dropdown selection
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [selectedData, setSelectedData] = useState(null); //to edit purticualr data item
  const [pogress, setPogress] = useState(0); //to get the upload pogress
  const [imgLinkForCheking, setImageLinkForCheking] = useState(null); //to CHECK if the image is same
  const [id, setId] = useState(null);
  // console.log("id : " + id);

  const options = ["workouts", "diet plans", "news and reaserach"];

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
    try {
      const response = await axios.get(
        `${BASE_URL}/getKInformationByCategory/${selectedOption}`
      );
      setTableData(response.data);
      console.log("Data captured: " + response.data);
    } catch (error) {
      console.log(error);
      alert(
        "An error occurred while fetching the data. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedOption]);
  //get data to object
  const kInformation = tableData.map((data, index) => {
 
    return {
      id: data.kid,
      title: data.title,
      description: data.description,
      imgLink: data.img_url,
      date: data.createdDate ? new Date(data.createdDate).toLocaleDateString() : 'No date', // Convert to localized date format or set as 'No date' if null
      
    };
  });

  // Sort the array in descending order based on the date
// kInformation.sort((a, b) => new Date(b.date) - new Date(a.date));
  //to show spesific number of length
  const maxDescriptionLength = 10;

  // update the data

  const handleSave = (newData) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to save changes?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Call your cancel reservation function here
             saveContent(newData)
             
          },
        },
      ],
      { cancelable: false }
    );
  };

  const saveContent = async (newData) => {
    //if image is not changed and if changed
    console.log(newData.id);
    if (imgLinkForCheking == newData.imgLink) {
      console.log("same image");
      try {
        // Send the updated data to the backend API
        await axios.put(
          `${BASE_URL}/updateKInformation/${newData.id}`,
          {
            title: newData.title,
            catergory: selectedOption,
            description: newData.description,
            img_url: newData.imgLink,
          }
        );
        alert("Successfully updated information");
        // Fetch the updated data from the backend API
        await fetchData();
        // Hide the edit modal
        setSelectedData(null);
      } catch (error) {
        console.log(error);
        alert(
          "An error occurred while updating the data. Please try again later."
        );
      }
    } else {
      const response = await fetch(newData.imgLink);
      const blob = await response.blob();

      const storageRef = ref(
        storage,
        `/images/${newData.imgLink.split("/").pop()}`
      ); //split is used only getting image link
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPogress(progress);
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            // send data to database when uploading finished
            axios
              .put(
                `${BASE_URL}/updateKInformation/${newData.id}`,
                {
                  title: newData.title,
                  catergory: selectedOption,
                  description: newData.description,
                  img_url: downloadURL,
                }
              )
              .then(function (response) {
                console.log(
                  "Data successfully saved to database: ",
                  response.data
                );
                // Fetch the updated data from the backend API
                fetchData();
                // Hide the edit modal
                setSelectedData(null);
              })
              .catch(function (error) {
                console.log(error);
              });

            //end of upload function
          });
        }
      );
    }

  };

  // end of update data code
  // hide the modal
  const handleCancel = () => {
    setSelectedData(null); // or any other code to close the modal
  };
  // end of hide the modal

  const handleDelete =  () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete the image ?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async() => {
            try {
              // Delete data to the backend API
              await axios.delete(
                `${BASE_URL}/deleteKInformationById/${id}`
              );
              alert("Data Deleted Successfully");
              // Fetch the updated data from the backend API
              await fetchData();
              // Hide the edit modal
              setSelectedData(null);
            } catch (error) {
              console.log(error);
              alert(
                "An error occurred while updating the data. Please try again later."
              );
            }
          },
        },
      ],
      { cancelable: false }
    );



    

  };


  
  return (
    <View style={{flex:1 , backgroundColor:'#fff'}}>
      <View style={styles.container}>
        {/* select catergory */}

        <View style={styles.description}>
        </View>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(value) => selectOption(value)}
        >
          <Picker.Item label="Select an option" value="" />
          {options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
      </Picker>

        <View style={styles.aroundTable}>
          {/* <ScrollView> */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Title</Text>
              <Text style={styles.tableHeaderText}>Description</Text>
              <Text style={styles.tableHeaderText}>Created date</Text>
              <Text style={styles.tableHeaderText}>Option</Text>
            </View>
            {/* Render table data here */}
            <View style={styles.tableData}>
              <ScrollView>
                {kInformation.map((item, index) => (
                 
                  <View style={styles.tableRow} key={index}>
                    <Text style={styles.tableCell}>
                      {item.title.slice(0, maxDescriptionLength)}
                    </Text>
                    <Text style={styles.tableCell}>
                      {item.description.slice(0, maxDescriptionLength)}
                    </Text>
                    <Text style={styles.tableCell}>{item.date}</Text>
                    {/* <TouchableOpacity  onPress={setSelectedData(item)}> */}
                    <Text style={styles.tableCell}>
                    
                    <TouchableOpacity
                    onPress={() => {
                      
                      setSelectedData(item);
                      setImageLinkForCheking(item.imgLink);
                      setId(item.id);
                    }}
                      style={styles.editButton}
                    >
                      {/* <TouchableOpacity> */}
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
          {/* </ScrollView> */}
        </View>
      </View>

      {/* TO VIEW THE MODAL...BEFOR OPEN THE MODAL CHECK selectedData IS NULL OR NOT */}
      {selectedData && (
        <EditContentModal
          visible={Boolean(selectedData)}
          data={selectedData}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
       )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: "center",
    alignContent: "center",
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
    color: "#007AFF",
  },
  //end of select catergory dropdown

  //styles for table
  aroundTable: {
    // flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#FFF",
    marginTop: 30,
    width: 375,
    height: 580,
    marginLeft: 10,
    // marginRight:10,
    paddingLeft: 20,
    paddingRight: 20,
    // paddingTop:5,
    paddingBottom: 5,
    // padding:15,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tableContainer: {
    // marginTop:50,
    marginTop: 20,

    flex: 1,
    // paddingVertical: 8,
  },
  tableHeader: {
    // width:96,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  tableHeaderText: {
    width: 96,
    // flex: 1,
    fontWeight: "bold",
    paddingVertical: 2,
  },
  tableRow: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  tableCell: {
    // flex: 1,
    width: 100,
    paddingVertical: 5,
    // paddingHorizontal:5,
    // paddingRight:10,
  },

  tableData: {
    flex: 1,
    paddingVertical: 8,
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

  //edit button styles
  // editButton: {
  //   // width:30,
  //   backgroundColor: '#007AFF',
  //   borderRadius: 3,
  //   padding: 2,
  //   margin: 2,
  //   alignItems: 'center',
  // },
  editButtonText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  //end of edit button
});

export default DeleteContentFromKSC;
