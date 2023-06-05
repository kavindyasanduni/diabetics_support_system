import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Swiper from "react-native-swiper";
import * as ImagePicker from "expo-image-picker";

const EditContentModal = ({ visible, data, onSave, onCancel ,onDelete}) => {
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [imgLink, setImgLink] = useState(data.imgLink);
  const swiperRef = useRef(null); // useRef hook is used to create a reference to the Swiper component, and that reference is passed to the ref attribute of the Swiper component
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  

  const handleSave = () => {
    const newData = {
      ...data,
      title,
      description,
      imgLink,
    };
    onSave(newData);
  };

  //image picker
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
      // setSelectedImageUri(result.uri);
      setImgLink(result.uri);
    }
  };
  //end of image picker

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        <Swiper ref={swiperRef} loop={false}>
          {/* first page */}
          <View style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
              <Text style={styles.modalHeader}>Edit Content</Text>
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
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={4}
                style={styles.descriptionInput}
              />
            </View>

            <View style={styles.buttonContainerFirstPage}>
              <View style={styles.canselButtonContainer}>
                <TouchableOpacity
                  // onPress={props.navigation.navigate("knowladgesharingdashbord")}
                  onPress={onCancel}
                  style={styles.buttonCansel}
                >
                  <Text style={styles.text}>Cancel</Text>
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
              <Text style={styles.modalHeader}>Edit Content</Text>
            </View>

            <View style={styles.subTitlesContainer}>
              <Text style={styles.subTitles}>Edit card image</Text>
            </View>
            <View style={styles.currentImageContainer}>
              <Text style={styles.currentImageText}>current image</Text>
            </View>
            <View style={styles.ImgView}>
              {/* <TextInput value={imgLink} onChangeText={setImgLink} /> */}
            </View>
            <View style={styles.imgViewing}>

              {/* select the image code..if user select show newly addded image */}
              
              {/* {selectedImageUri ?<Image  source={{ uri: selectedImageUri }} style={{ width: '100%', height: 200 }} /> : <Image
                source={{ uri: imgLink }}
                style={{ width: "100%", height: 200 }}
              />}               */}
              <Image
                source={{ uri: imgLink }}
                style={{ width: "100%", height: 200 }}
              />
            </View>
            <View style={styles.chooseImageContainer}>
              <TouchableOpacity
                style={styles.chooseImageButton}
                onPress={PickImage}
              >
                {/* <ButtonD title ="Update Knowledge Sharing center"  navigation="knowladgesharingdashbord" /> */}
                <Text style={styles.chooseImageText}>
                  Click here to select new image
                </Text>
              </TouchableOpacity>
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
                  onPress={onDelete}
                  style={styles.buttonCansel}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.saveButtonConatiner}>
              <TouchableOpacity
                onPress={handleSave}
                style={styles.buttonSaveChanges}
              >
                <Text style={styles.buttonText}>Save changes</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.deleteButtonConatiner}>
              <TouchableOpacity
                onPress={onCancel}
                style={styles.buttonDeleteContent}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Swiper>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#1D11AD",
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
export default EditContentModal;
