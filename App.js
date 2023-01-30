import * as React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable,FlatList} from 'react-native';

const CITY = ["Seoul", "Beijing","Tokyo","Shanghai"];
const APIKEY = "20648459a0ebf14b4f8d74173977c595"

export default function App() {

  const[isReady, setReady]= React.useState(false);
  const[data, setData]=React.useState([]);
  const[region,setRegion]=React.useState("Seoul");

  React.useEffect(()=>{
    const timer = setTimeout(async()=>{
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${APIKEY}`);
      const json = await response.json();
      console.log(json);
      setData(json);
    }catch(err){
      console.log(err);
    }
    },0);
    return() => {
    clearTimeout(timer);
    };
  },[]);

  const renderItem = ({item, index})=>{
    return(
      <View
      style={{borderRadius:15, alignItems:"center", justifyContent:"center",backgroundColor:"#AED3F0", marginHorizontal:10,width:100, height:40,marginTop:40}}
      >
        <Text style={{color:"#F4F3F9"}}>{item}</Text>
      </View>
    )
  }

  if(isReady){
    return( 
      <View style={styles.container2}>
        <View>
          <FlatList horizontal data={CITY} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
        </View>
        <View style={{marginTop:30,alignSelf:"center",width:300,height:400,borderRadius:20}}>
          <View>
            <Image 
              style={{width:250, height:200,alignSelf:"center"}} 
              source={{
                url: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
              }}
            />
            <Text style={{textAlign:"center",fontSize:35,fontWeight:"bold",color:"#35545C"}}>{data.weather[0].main}</Text>
            <Text style={{textAlign:"center",fontSize:20,fontWeight:"bold",color:"#5D7479"}}>{data.weather[0].description}</Text>
          </View>
        </View>
        <StatusBar style="auto" /> 
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={{marginTop:140, width:400,height:400,alignSelf:"center"}} source={require('./assets/wsiwt.png')}/>
      <Text style={{width:400,marginTop:105,textAlign:'center', alignSelf:'center',fontSize:12, color:"#35545C"}}>오늘의 날씨에 어떤 옷을 입어야할지 모르겠다면?</Text>
      <Text style={{fontWeight:'bold',marginTop:10, width:400, textAlign:'center', alignSelf:'center', fontSize:13, color:"#35545C"}}>
        WSIWT는 날씨와 기온의 따라 룩을 소개시켜드립니다!
      </Text>
      <Pressable style={{width:200, height:55, marginTop:30,backgroundColor:"#35545C",alignSelf:"center",alignItems:'center',justifyContent:"center",borderRadius:10,}}
      onPress={()=>setReady(true)}>
        <Text style={{fontWeight:'bold',color:"white"}}>WHAT'S LOOK IS BEST?</Text>
      </Pressable>
      <StatusBar style="auto" /> 
    </View>
  );screenX
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container2: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop:50
  },
});
