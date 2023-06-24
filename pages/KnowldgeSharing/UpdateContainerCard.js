import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
// importing firebase modules
import { storage } from "../../firebaseconfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { async } from "@firebase/util";
import Swiper from "react-native-swiper";
import BASE_URL from "../../config";

const UpdateContainerCard = (props) => {
  const [image, setImage] = useState(null);
  const [viewBeforeUpload, setViewBeforeUpload] = useState(null);
  const [text, setText] = useState(""); //for description
  const [title, setTitle] = useState(""); // for title
  const [pogress, setPogress] = useState(0); //to get the upload pogress
  const [loading, setLoading] = useState(true); //to get the upload pogress
  //for dropdown selection
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const swiperRef = useRef(null); // useRef hook is used to create a reference to the Swiper component, and that reference is passed to the ref attribute of the Swiper component
  const [visibly , setVisible] = useState(true);
  const options = ["workouts", "diet plans", "news and reaserach"];

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    toggleDropdown();
  };

    //end for dropdown selection
  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Permission denied!");
        }
      }
    };

    requestPermission();
  }, []);
  let result;
  const PickImage = async () => {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  //to confirmation to save 
  const handleSave = () =>{
    Alert.alert(
      'Confirmation',
      'Are you sure you want save content?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Call your cancel reservation function here
            
             handleImageSubmit();
          },
        },
      ],
      { cancelable: false }
    );
  }

  const handleImageSubmit = async () => {

     if (!image) {
    alert('Please select an image.');
    return;
  }
  
    const response = await fetch(image);
    const blob = await response.blob();

    const storageRef = ref(storage, `/images/${image.split("/").pop()}`); //split is used only getting image link
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
          //send data to database when uploading finished
          axios
            .post(`${BASE_URL}/addKInformation`, {
              title: title,
              catergory: selectedOption,
              description: text,
              img_url: downloadURL,
            })
            .then(function (response) {
              console.log(
                "Data successfully saved to database: ",
                response.data
              );
            setText(null);
            setImage(null);
            setTitle(null);
            setSelectedOption(null);
            alert("Data successfully saved!");

            swiperRef.current.scrollBy(-2, true);

            })
            .catch(function (error) {
              console.log(error);
            });
          //end of upload function
        });
      }
    );
    // Remove the selected image
  setImage(null);
  };

  //to check user have filled the title and description
  const handleNextButtonPress = () => {
    if (title.trim() === '' || text.trim() === '') {
      // Check if the title or description is empty or contains only whitespace
      alert('Please fill in the title and description.');
      return;
    }
    // Proceed to the next step
    swiperRef.current.scrollBy(1, true);
  };

  const handleNextButtonSelectCategory = () => {
    if (selectedOption === null) {
      // Check if the title or description is empty or contains only whitespace
      alert('Please Select category.');
      return;
    }
    // Proceed to the next step
    swiperRef.current.scrollBy(1, true);
  };

  const onDelete = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete the image changes?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setImage(null);
          },
        },
      ],
      { cancelable: false }
    );
    
  };

  const onCancel = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to discard changes?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Call your cancel reservation function here
             props.navigation.navigate("knowladgesharingdashbord")
             
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (

    //  <Modal visible={vissible} animationType="slide">

  <View style={styles.container}> 
    <View style={{ flex: 1 }}>
    <Swiper ref={swiperRef} loop={false} initialPage={0}>      
    {/* first page */}
      <View style={{ flex: 1 }}>
          {/* select catergory */}
          <View style={styles.headerContainer}>
            <Text style={styles.modalHeader}>Add new Content</Text>
          </View>
          <View style={styles.subTitlesContainer}>
            <Text style={styles.subTitles}>Select a category</Text>
          </View>

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
        <View style={styles.buttonContainerFirstPage}>
          <View style={styles.nextButtonContainer}>
                  <TouchableOpacity onPress={handleNextButtonSelectCategory} style={styles.button_s}>
                    <Text style={styles.buttonText}>Next</Text>
                  </TouchableOpacity>
            </View>
          </View>
      </View> 
        {/* Second page */}
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.modalHeader}>Add new Content</Text>
          </View>
          <View style={styles.subTitlesContainer}>
            <Text style={styles.subTitles}>Title</Text>
          </View>
          <View style={styles.editTitle}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              multiline={true}
              numberOfLines={4}
              style={styles.descriptionInput}
            />
          </View>
          <View style={styles.subTitlesContainer}>
            <Text style={styles.subTitles}>Description</Text>
          </View>
          <View style={styles.editDescription}>
            <TextInput
              value={text}
              onChangeText={setText}
              multiline={true}
              numberOfLines={4}
              style={styles.descriptionInput}
            />
          </View>

          <View style={styles.buttonContainerFirstPage}>
          <View style={styles.nextButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  swiperRef.current.scrollBy(-1, true);
                }}
                style={styles.buttonPrevious}
              >
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.nextButtonContainer}>
                  <TouchableOpacity onPress={handleNextButtonPress} style={styles.button_s}>
                    <Text style={styles.buttonText}>Next</Text>
                  </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Third page */}
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.modalHeader}>Add new Content</Text>
          </View>

          <View style={styles.subTitlesContainer}>
            <Text style={styles.subTitles}>Add card image</Text>
          </View>

          <View style={styles.ImgView}>
          </View>
          <View style={styles.chooseImageContainer}>
              <TouchableOpacity
                style={styles.chooseImageButton}
                onPress={PickImage}
              >
               
                <Text style={styles.chooseImageText}>
                  Click here to select new image
                </Text>
              </TouchableOpacity>
            </View>
          <View style={styles.imgViewing}>
            {/* <Image
              source={{ uri: image }}
              style={{ width: "100%", height: 200 }}
            /> */}
              {image && (
              <Image
                source={{ uri: image }}
                style={{ width: '100%', height: 200 }}
              />
            )}
           </View>
          
          <View>
            {/* <Image  source={{ uri: selectedImageUri }} style={{ width: '100%', height: 200 }} /> */}
          </View>

          <View style={styles.buttonContainerSecondPage}>
            <View style={styles.nextButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  swiperRef.current.scrollBy(-1, true);
                }}
                style={styles.buttonPrevious}
              >
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>
            </View>
            {/* button chage cansel to delete */}
            <View style={styles.canselButtonContainer}>
              <TouchableOpacity
                onPress={onDelete }
                style={styles.buttonCansel}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.saveButtonConatiner}>
            <TouchableOpacity
               onPress={() => {
                      handleSave();
                  }}
              style={styles.buttonSaveChanges}
            >
              <Text style={styles.buttonText}>Save content</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.deleteButtonConatiner}>
          <View style={styles.deleteButtonConatiner}>
            <TouchableOpacity onPress={onCancel} style={styles.buttonDeleteContent}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </Swiper>
    </View>
    </View>

    // </Modal>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",

  },
  
  description: {
    alignItems: "center",
    marginTop: 100,  
  },

  // //styles for drop down
  dropdownButton: {
    backgroundColor: "#f2f2f2",
    width: 290,
    padding: 10,
    borderRadius: 10,
  },
  dropdownButtonText: {
    color: "#333",
    fontSize: 14,

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

  // //img viewing
  // imgViewing: {
  //   marginTop: 30,
  //   alignItems: "center",
  // },


  //////////////////////////////////////////////////////////


   //styles for the modal header
   headerContainer: {
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  modalHeader: {
    color: "#1D11AD",
    fontWeight: "bold",
    fontSize: 20,
  },
  //end of headerContainer
  subTitles: {
    color: "#1D11AD",
    fontWeight: "bold",
    fontSize: 16,
  },
  subTitlesContainer: {
    paddingLeft: 20,
    margin: 10,
    // alignContent:'center',
  },

  //styles for the edit title
  editTitle: {
    paddingLeft: 20,
    paddingRight: 30,

    paddingTop: 8,
    left: 8,
    backgroundColor: "#FFFFFF",
    width: 370,
    height: 100,
    borderRadius: 15,
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
  //edit description
  editDescription: {
    paddingLeft: 20,
    paddingTop: 8,
    left: 8,
    backgroundColor: "#FFFFFF",
    width: 370,
    height: 300,
    borderRadius: 15,
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
  descriptionInput: {
    width: 350,
    fontSize: 15,
  },
  //end of edit description

  //button container
  buttonContainerFirstPage: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    left: 5,
    justifyContent: "center",
  },

  //cansel button
  canselButtonContainer: {
    // marginTop: 20,
    // left:5,
    padding: 10,
  },
  buttonCansel: {
    backgroundColor: "#EA2027",

    padding: 3,
    borderRadius: 18,
    alignItems: "center",
    width: 110,
    height: 35,
  },
  buttonText: {
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    padding: 5,
  },

  //button submit
  nextButtonContainer: {
    padding: 10,
  },
  button_s: {
    backgroundColor: "#00a8ff",
    padding: 3,
    borderRadius: 18,
    alignItems: "center",
    width: 110,
    height: 35,
  },
  text: {
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    padding: 5,
  },

  //image viewing
  imgViewing: {
    width: 370,
    marginTop:25,
    left: 10,
    alignItems: "center",
  },
  currentImageContainer: {
    // paddingLeft: 20,
    margin: 10,
    alignItems: "center",
  },

  currentImageText: {
    color: "#2c3e50",
    fontWeight: "bold",
    fontSize: 14,
    // left:56,
    alignContent: "center",
    justifyContent: "center",
  },
  //end of image viewing
  //choose phot button
  chooseImageContainer: {
    alignItems: "center",
    paddingTop: 20,
  },

  chooseImageButton: {
    // backgroundColor: "#ecf0f1",
    // padding: 3,
    // borderRadius: 18,
    alignItems: "center",
    // width: 160,
    // height: 36,
  },
  chooseImageText: {
    color: "#34495e",
  },
  //buttons conatiner second page
  buttonContainerSecondPage: {
    // flex:1,
    flexDirection: "row",
    marginTop: 50,
    left: 5,
    justifyContent: "center",
  },

  buttonPrevious: {
    backgroundColor: "#1D11AD",
    padding: 3,
    borderRadius: 18,
    alignItems: "center",
    width: 110,
    height: 35,
    // paddingRight:10,
  },
  //save button
  saveButtonConatiner: {
    alignItems: "center",
    marginTop: 50,
  },
  buttonSaveChanges: {
    backgroundColor: "#3498db",
    padding: 5,
    borderRadius: 18,
    alignItems: "center",
    width: 130,
    height: 40,
    // paddingRight:10,
  },
  //end of savechages button

  //delete all content
  deleteButtonConatiner:{
    alignItems: "center",
    marginTop: 5,
  },
  buttonDeleteContent:{
    backgroundColor: "#c0392b",
    padding: 5,
    borderRadius: 18,
    alignItems: "center",
    width: 130,
    height: 40,
  },
});

export default UpdateContainerCard;

