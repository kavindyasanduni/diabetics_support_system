import React from "react";

import { View, Text ,Button,StyleSheet,TouchableOpacity } from "react-native";

const ButtonD = (props) => {
  const navigate = props.navigation;
  console.log(navigate)
  return (
    <View style = {styles.button_view}>
      
          <TouchableOpacity style={styles.button}  onPress={()=> props.navigation.navigate("knowladgesharingdashbord")}>
                <Text style={styles.buttonText}  >{props.title}</Text>
            </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  button_styles:{
        // borderColor: '#7a42f4',
        borderWidth:1,
        // borderBottomColor:red
        height:20,
        width:250,
        color:"#841584",
        backgroundColor: 'red'
        
        
      },

      button: {
        backgroundColor: '#130f40',
        
        // top:512,
        width:250,
        height:49,
        // left:,
        borderRadius:25, 
        margin:10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        
     
       
    },
    buttonText:{
      justifyContent:'center',
        textAlign:'center',
        color:'#555555',
        padding: 12,
        
        
    },
    button_view:{
      margin:20,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      
    }
});

export default ButtonD;
