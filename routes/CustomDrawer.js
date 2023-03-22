import React from "react";
import { View,Text, ImageBackground, Image ,TouchableOpacity} from "react-native";
import {DrawerContentScrollView,DrawerItemList} from "@react-navigation/drawer"


const CustomDrawer=(props) =>{
    return(
        <View style={{flex:1}} >
        <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:'#82006d6'}}>
            <ImageBackground source={require('../assets/icon.png')} style={{padding:20}}>
                <Image source={require('../assets/icon.png')} style={{width:80,height:80,borderRadius:40,marginBottom:10}}/>
                <Text>Shakthi jayasinghe</Text>
            </ImageBackground>
            <View style={{flex:1, backgroundColor:'#ffff', paddingTop:10}}>
            <DrawerItemList {...props}/>
            </View>
        </DrawerContentScrollView>
        <View style={{flex:1,borderTopWidth:1,borderTopColor:'#ccc'}}>
            <TouchableOpacity onPress={()=>props.navigation.navigate("Login")} style={{paddingVertical:15}}>
            <Text>Sign Out</Text>
            </TouchableOpacity>
            
        </View>
        </View>
    )
}

export default CustomDrawer;