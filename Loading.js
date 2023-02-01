import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';

export default function Loading(){
 return (
        <View style={styles.container}>
          <Image style={{marginTop:140, width:400,height:400,alignSelf:"center"}} source={require('./assets/wsiwt.png')}/>
          <Text style={{width:400,marginTop:105,textAlign:'center', alignSelf:'center',fontSize:12, color:"#35545C"}}>오늘의 날씨에 어떤 옷을 입어야할지 모르겠다면?</Text>
          <Text style={{fontWeight:'bold',marginTop:10, width:400, textAlign:'center', alignSelf:'center', fontSize:13, color:"#35545C"}}>
            WSIWT는 날씨와 기온의 따라 룩을 소개시켜드립니다!
          </Text>
          <View style={{width:200, height:55, marginTop:30,backgroundColor:"#35545C",alignSelf:"center",alignItems:'center',justifyContent:"center",borderRadius:10}}>
            <Text style={{fontWeight:'bold',color:"white"}}>Feeling The Weather...</Text>
            </View>
          <StatusBar style="auto" /> 
        </View>
 );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
      },
    text :{
        color: "#2c2d2c",
        fontSize: 30
    }
});