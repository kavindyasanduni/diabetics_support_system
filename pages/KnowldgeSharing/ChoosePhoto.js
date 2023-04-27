import React, { useState , useEffect} from 'react';
import { TextInput } from 'react-native';
import { Button, View,StyleSheet,Platform ,Image ,TouchableOpacity,Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
// import ImagePicker from 'react-native-image-crop-picker';


const  ChoosePhoto= () => {
  const [image, setImage] = useState(null);

  // useEffect ( async ()=>{
  //   if(Platform.OS !== 'web'){
  //     const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if( status !==  'granted'){
  //       alert('permision denied!');

  //     } 
  //   }
  // },[])

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission denied!');
        }
      }
    };
  
    requestPermission();
  }, []);

  const PickImage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],
      quality:1  
    })
    console.log(result);
    if(!result.canceled){
      setImage(result.uri)

    }
  }


  return (
    <View>
        {/* <Button title='Choose images'  color="#be2edd" height = '20' borderRadius='5' onPress={PickImage} style ={styles.buttonStyles} /> */}
        <View style = {styles.button_view}>

        <TouchableOpacity style={styles.button} onPress={PickImage}>
            {/* <ButtonD title ="Update Knowledge Sharing center"  navigation="knowladgesharingdashbord" /> */}
                <Text style={styles.buttonText}>Choose Image</Text>

            </TouchableOpacity>
            </View>
        {image && <Image source={{uri:image}} style={{
          width:200,
          height:200,
          
        }}/>}
    </View>
  );
};

export default ChoosePhoto;

const styles = StyleSheet.create({
 
  button: {
    backgroundColor: '#be2edd',
    
    // top:512,
    width:135,
    height:30,
    // left:,
    borderRadius:25, 
    // margin:10,
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    
 
   
},
buttonText:{
  justifyContent:'center',
    textAlign:'center',
    // color:'#555555',
    color:'#FFF',

    padding: 5,
    
    
},
button_view:{
  // margin:20,
  // flex: 1,
  // alignItems: 'center',
  // justifyContent: 'center',
  
}
})