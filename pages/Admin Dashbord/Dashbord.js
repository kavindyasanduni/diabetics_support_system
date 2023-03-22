import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import ButtonD from './ButtonD';
import Triangle from './Triangle ';

const Dashbord = (props) =>{
    return(
        <View style={styles.background}>
            {/* <Triangle/> */}
        <View style={styles.around_container}>    
        <View style={styles.container}>
            <View style={styles.Button_styles}>
            <ButtonD title ="Update Doctor Details" navigation="knowladgesharingdashbord" />
            </View>
           
        </View>
        <View style={styles.container}>
            <View>
            <ButtonD title ="Update Nutritionist Details"navigation="knowladgesharingdashbord" />
            </View>
            
        </View>
        <View style={styles.container}>
            <View>
            <ButtonD title ="Reservations" navigation="knowladgesharingdashbord"/>
            </View>
            
        </View>
        <View style={styles.container}>
            <View>
            <ButtonD title ="Payments & Refunding" navigation="knowladgesharingdashbord"/>
            </View>
            
        </View>
        <View style={styles.container}>
            <View style = {styles.button_view}>
            <TouchableOpacity style={styles.button} onPress={()=> props.navigation.navigate("knowladgesharingdashbord")}>
            {/* <ButtonD title ="Update Knowledge Sharing center"  navigation="knowladgesharingdashbord" /> */}
                <Text style={styles.buttonText}>Update Knowledge Sharing center</Text>

            </TouchableOpacity>
            </View>

          
            
        </View>
        </View>
        </View>
    );
} 
const styles = StyleSheet.create({
    background:{
        backgroundColor:"#FFF",
        flex:1,
        // height:844
    },
    around_container:{
        marginTop:100,
        flex:3,
     
        
       

    },
  container:{
    
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    
  },
  Button_styles:{
    // paddingLeft:100
  },


  button: {
    backgroundColor: '#be2edd',
    
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
    // color:'#555555',
    color:'#FFF',

    padding: 12,
    
    
},
button_view:{
  margin:20,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  
}

  });
export default Dashbord;