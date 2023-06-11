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


const UpdateContainerCard = () => {
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

  const [vissible , setVissible] = useState(true);


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

  /////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   console.log(text);
  //   // setText(text);
  //   console.log(title);
  // }, [text, title]);

  //end of sending data to database
  // let imageLink;

  const handleImageSubmit = async () => {

    // if (!result || !result.uri) {
    //   alert("Please select an image first.");
    //   return;
    // }
    // clickedSubmit = true;

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
          // setImage(downloadURL);
          // imageLink = downloadURL;

          //send data to database when uploading finished
          axios
            .post("http:///192.168.8.103:8082/addKInformation", {
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
            })
            .catch(function (error) {
              console.log(error);
            });
          // setLoading(false);

          //end of upload function
        });
      }
    );
  };

  return (
    // <View>
    //   <View style={styles.container}>
    //     <View style={styles.headerContainer}>
    //       <View>
    //         <Text style={styles.modelHeader}>{props.modelHeader}</Text>
    //       </View>
    //     </View>
    //     {/* select catergory */}

    //     <View style={styles.description}>
    //       <TouchableOpacity
    //         onPress={toggleDropdown}
    //         style={styles.dropdownButton}
    //       >
    //         <Text style={styles.dropdownButtonText}>
    //           {selectedOption || "Select an option"}
    //         </Text>
    //       </TouchableOpacity>
    //       <Modal visible={dropdownVisible} animationType="slide">
    //         <View style={styles.dropdownModal}>
    //           {options.map((option, index) => (
    //             <TouchableOpacity
    //               key={index}
    //               onPress={() => selectOption(option)}
    //               style={styles.dropdownItem}
    //             >
    //               <Text style={styles.dropdownItemText}>{option}</Text>
    //             </TouchableOpacity>
    //           ))}
    //           <TouchableOpacity
    //             onPress={toggleDropdown}
    //             style={styles.dropdownItem}
    //           >
    //             <Text style={styles.dropdownItemText}>Cancel</Text>
    //           </TouchableOpacity>
    //         </View>
    //       </Modal>
    //     </View>

    //     <View style={styles.description}>
    //       <TextInput
    //         style={{
    //           height: 40,
    //           width: 250,
    //           borderColor: "gray",
    //           borderWidth: 1,
    //           borderRadius: 10,
    //           paddingLeft: 20,
    //         }}
    //         onChangeText={setTitle}
    //         value={title}
    //         placeholder="Content title"
    //       />
    //     </View>

    //     <View style={styles.description}>
    //       <TextInput
    //         style={{
    //           height: 80,
    //           width: 250,
    //           borderColor: "gray",
    //           borderWidth: 1,
    //           borderRadius: 10,
    //           padding: 20,
    //         }}
    //         onChangeText={setText}
    //         value={text}
    //         placeholder="Description"
    //       />
    //     </View>
    //     <View style={styles.addPhotoCntainer}>
    //       <View>
    //         <Text style={styles.addPhoto}>{props.text}</Text>
    //       </View>
    //       <View>
    //         <View style={styles.button_view}>
    //           <TouchableOpacity style={styles.button} onPress={PickImage}>
    //             {/* <ButtonD title ="Update Knowledge Sharing center"  navigation="knowladgesharingdashbord" /> */}
    //             <Text style={styles.buttonText}>Choose Image</Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </View>
    //     <View style={styles.imgViewing}>
    //       {viewBeforeUpload && (
    //         <Image
    //           source={{ uri: viewBeforeUpload }}
    //           style={{
    //             width: 250,
    //             height: 150,
    //           }}
    //         />
    //       )}
    //     </View>
    //     <View style={styles.submitButtonCOntainer}>
    //       <View>
    //         <TouchableOpacity
    //           style={styles.button_s}
    //           onPress={() => {
    //             handleImageSubmit();
    //           }}
    //         >
    //           <Text style={styles.text}>Submit</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </View>
    // </View>


    ///////////////////////////////////////////////////////////////

    //  <Modal visible={vissible} animationType="slide">

  <View style={styles.container}> 
   

    <View style={{ flex: 1 }}>
      <Swiper ref={swiperRef} loop={false}>
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
              <TouchableOpacity
                onPress={() => {
                  swiperRef.current.scrollBy(1, true);
                }}
                style={styles.button_s}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View> 
        {/* first page */}
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
              <TouchableOpacity
                onPress={() => {
                  swiperRef.current.scrollBy(1, true);
                }}
                style={styles.button_s}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* second page */}
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
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: 200 }}
            />
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
                // onPress={onDelete}
                style={styles.buttonCansel}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.saveButtonConatiner}>
            <TouchableOpacity
               onPress={() => {
                            handleImageSubmit();
                  }}
              style={styles.buttonSaveChanges}
            >
              <Text style={styles.buttonText}>Save content</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.deleteButtonConatiner}>
            <TouchableOpacity
              onPress={()=>setVissible(false)}
              style={styles.buttonDeleteContent}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swiper>
    </View>
    </View>

    // </Modal>
  

  /////////////////////////////////////////////////////////
  );
};

const styles = StyleSheet.create({
  // aroundContainer: {
  //   // marginTop: 30,
  //   height:"100%",
  //   backgroundColor: "#FFF",
    
    // flex:1,

  // },
  // aroundContainerSecond: {
  //   marginTop: 100,
  // },
  container: {
    // justifyContent: "center",
    backgroundColor: "#FFF",
    // marginTop: 10,
    width: "100%",
    height: "100%",
    // left: 49,
    // borderRadius: 32,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: "#000000",
    //     shadowOffset: {
    //       width: 0,
    //       height: 4,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 4,
    //   },
    //   android: {
    //     elevation: 5,
    //   },
    // }),
  },
  // modelHeader: {
  //   color: "#1D11AD",
  //   fontWeight: "bold",
  // },
  // headerContainer: {
  //   alignItems: "center",
  //   padding: 10,
  //   marginTop: 10,
  // },
  description: {
    alignItems: "center",
    marginTop: 100,

    // borderColor: "red",
  },
  // addPhotoCntainer: {
  //   flexDirection: "row",
  //   marginTop: 20,
  //   padding: 10,

  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   marginLeft: 15,
  //   marginRight: 15,
  // },
  // submitButtonCOntainer: {
  //   flexDirection: "row",
  //   flex: 1,
  //   justifyContent: "center",
  //   alignContent: "center",
  //   left: 115,
  //   marginTop: 20,
  //   width: 200,
  // },
  // addPhoto: {
  //   color: "#1D11AD",
  // },
  // //css for choose phot
  // button: {
  //   backgroundColor: "#be2edd",
  //   width: 135,
  //   height: 30,
  //   borderRadius: 25,
  // },
  // buttonText: {
  //   justifyContent: "center",
  //   textAlign: "center",
  //   color: "#FFF",

  //   padding: 5,
  // },

  // //button submit
  // button_s: {
  //   backgroundColor: "#1D11AD",
  //   padding: 5,
  //   borderRadius: 18,
  //   alignItems: "center",
  //   width: 110,
  //   height: 32,
  // },
  // text: {
  //   color: "white",
  //   fontWeight: "bold",
  // },

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

