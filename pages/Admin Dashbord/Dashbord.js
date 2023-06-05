import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import ButtonD from "./ButtonD";
import SubmitButton from "../KnowldgeSharing/SubmitButton";
import Triangle from "./Triangle ";
import Icon from "react-native-vector-icons/MaterialIcons";
import KnowledgeSharingAnalytic from "./Analytic Data/KnowladgeSharingAnalytic";

const Dashbord = (props) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Your dashboard content goes here */}

      {/* The menu icon */}
      <TouchableOpacity onPress={toggleMenu}>
        <Icon name="menu" size={30} />
      </TouchableOpacity>
      <View style = { {flex : 1 , paddingBottom: 5}}>
        <ScrollView>
          <View>
            <KnowledgeSharingAnalytic />
          </View>

          <View>
            <KnowledgeSharingAnalytic />
          </View>
        </ScrollView>
      </View>
      {/* The side menu */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={toggleMenu}
      >
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              width: 250,
            }}
          >
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
              <Text>Menu item 1</Text>
              <Text>Menu item 2</Text>
              <Text>Menu item 3</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  props.navigation.navigate("knowladgesharingdashbord")
                }
              >
                {/* <ButtonD title ="Update Knowledge Sharing center"  navigation="knowladgesharingdashbord" /> */}
                <Text style={styles.buttonText}>knowladgesharingdashbord</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );

  /////////////////////////////////////////////////////////////////////////////////

  //   <View style={styles.background}>
  //     <View style={styles.around_container}>
  //       <View style={styles.container}>
  //         <View style={styles.Button_styles}>
  //           <ButtonD
  //             title="Update Doctor Details"
  //             navigation="knowladgesharingdashbord"
  //           />
  //         </View>
  //       </View>
  //       <View style={styles.container}>
  //         <View>
  //           <ButtonD
  //             title="Update Nutritionist Details"
  //             navigation="knowladgesharingdashbord"
  //           />
  //         </View>
  //       </View>
  //       <View style={styles.container}>
  //         <View>
  //           <ButtonD
  //             title="Reservations"
  //             navigation="knowladgesharingdashbord"
  //           />
  //         </View>
  //       </View>
  //       <View style={styles.container}>
  //         <View>
  //           <ButtonD
  //             title="Payments & Refunding"
  //             navigation="knowladgesharingdashbord"
  //           />
  //         </View>
  //       </View>
  //       <View style={styles.container}>
  //         <View style={styles.button_view}>
  //           <TouchableOpacity
  //             style={styles.button}
  //             onPress={() =>
  //               props.navigation.navigate("knowladgesharingdashbord")
  //             }
  //           >
  //             {/* <ButtonD title ="Update Knowledge Sharing center"  navigation="knowladgesharingdashbord" /> */}
  //             <Text style={styles.buttonText}>
  //               Add content to web application
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>

  //     </View>
  //   </View>
  // );
};
const styles = StyleSheet.create({
  // background: {
  //   backgroundColor: "#FFF",
  //   flex: 1,
  //   // height:844
  // },
  // around_container: {
  //   marginTop: 100,
  //   flex: 3,
  // },
  // container: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // Button_styles: {
  //   // paddingLeft:100
  // },
  // button: {
  //   backgroundColor: "#be2edd",
  //   // top:512,
  //   width: 250,
  //   height: 49,
  //   // left:,
  //   borderRadius: 25,
  //   margin: 10,
  //   shadowColor: "black",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 2,
  // },
  // buttonText: {
  //   justifyContent: "center",
  //   textAlign: "center",
  //   // color:'#555555',
  //   color: "#FFF",
  //   padding: 12,
  // },
  // button_view: {
  //   margin: 20,
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  ////////////////////////////////////////////////////////////////
});
export default Dashbord;
