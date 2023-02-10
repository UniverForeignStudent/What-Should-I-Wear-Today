import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {View,Text,Dimensions,ActivityIndicator,StyleSheet,ImageBackground,ScrollView,Image} from "react-native";
import { Fontisto } from "@expo/vector-icons";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "784ab24ff2ed5d94d4288abed9e25d13";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState([]);
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    
    <View style={styles.container}>
      {days.length === 0 ? (
        <View style={{marginBottom:2000}}>
          <View style={styles.loading}>
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
        </View>
      ) : (days.map((day, index) => (
      <ImageBackground source={require("./assets/wave.png")} style={styles.bgImage}>
        <StatusBar style="dark" />
        <View style={{flexDirection: "row"}}>
          <Image style={styles.logo} source={require("./assets/logo.png")}></Image>
          <Image style={{marginTop:0,height:70,width:70,marginTop:28,}} source={require("./assets/name.png")}></Image>
        </View>
        <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        >
    
        <View key={index} style={styles.day}>
          <View style={{alignItems: "center", width: "100%",}}>
        </View>
        <View style={{justifyContent: "center", alignItems: "center",}}>
          <View style={styles.city}>
            <Text style={styles.cityName}>{city}</Text>
          </View>
          <Text style={{fontWeight:'bold',paddingBottom:25}}>{new Date(day.dt * 1000).toString().substring(0, 10)}</Text>
          <Fontisto name={icons[day.weather[0].main]} size={200} color="black"/>
          <Text style={styles.description}>{day.weather[0].main}</Text>
          <Text style={styles.tinyText}>{day.weather[0].description}</Text>
        </View>
        <View style={{flexDirection: "row",justifyContent: "space-around",marginTop:70}}>
          <View style={{borderRadius:40, alignItems:"center",justifyContent:"center",backgroundColor:"white",marginHorizontal:10, width:70, height:190}}>
            <Image style={{alingself:"center",width:50,height:50}} source={require("./assets/day.png")}/>
            <Text style={{fontWeight: 'bold',color:"black",fontSize:11}}>{day.temp.day}</Text>
          </View>
          <View style={{borderRadius:70, alignItems:"center",justifyContent:"center",backgroundColor:"white",marginHorizontal:10, width:70, height:190}}>
            <Image style={{alingself:"center",width:50,height:50}} source={require("./assets/night.png")}/>
            <Text style={{fontWeight: 'bold',color:"black",fontSize:11}}>{day.temp.night}</Text>
          </View>
          <View style={{borderRadius:70, alignItems:"center",justifyContent:"center",backgroundColor:"white",marginHorizontal:10, width:70, height:190}}>
            <Image style={{alingself:"center",width:50,height:50}} source={require("./assets/min.png")}/>
            <Text style={{fontWeight: 'bold',color:"black",fontSize:11}}>{day.temp.min}</Text>
          </View>
          <View style={{borderRadius:70, alignItems:"center",justifyContent:"center",backgroundColor:"white",marginHorizontal:10, width:70, height:190}}>
            <Image style={{alingself:"center",width:50,height:50}} source={require("./assets/max.png")}/>
            <Text style={{fontWeight: 'bold',color:"black",fontSize:11}}>{day.temp.max}</Text>
          </View>
        </View> 
      </View>         
      <View style={{width: SCREEN_WIDTH}}>
        <View  style={{alignItems:"center"}}><Text style={{fontSize:20}}>오늘의 날씨에 어울리는 옷은 이거에요!</Text></View>
        
        <View style={{marginTop:20}}>
        {day.temp.day<=4 && (<View style={styles.outer}><Image style={{width:130,height:130}} source={require("./assets/fashion/padded-jacket.png")} /></View>)}
        {day.temp.day<=4 &&(<View style={styles.shirt}><Image style={{width:130,height:130}} source={require("./assets/fashion/hood.png")} /></View>)}
        {day.temp.day<=4 &&(<View style={styles.pants}><Image style={{width:130,height:130}} source={require("./assets/fashion/denim-pants.png")} /></View>)}
        {day.temp.day<=4 &&(<View style={styles.shoes}><Image style={{width:130,height:130}} source={require("./assets/fashion/sneakers.png")} /></View>)}
        </View>
        <View>
        {4<day.temp.day && day.temp.day<=8 && (<View style={styles.outer}><Image style={{width:130,height:130}} source={require("./assets/fashion/coat.png")} /></View>)}
        {4<day.temp.day && day.temp.day<=8 && (<View style={styles.shirt}><Image style={{width:130,height:130}} source={require("./assets/fashion/hood.png")} /></View>)}
        {4<day.temp.day && day.temp.day<=8 && (<View style={styles.pants}><Image style={{width:130,height:130}} source={require("./assets/fashion/denim-pants.png")} /></View>)}
        {4<day.temp.day && day.temp.day<=8 && (<View style={styles.shoes}><Image style={{width:130,height:130}} source={require("./assets/fashion/sneakers.png")} /></View>)}
        </View>
        <View>
        {8<day.temp.day && day.temp.day<=11 && (<View style={styles.outer}><Image style={{width:130,height:130}} source={require("./assets/fashion/varsity.png")} /></View>)}
        {8<day.temp.day && day.temp.day<=11 && (<View style={styles.shirt}><Image style={{width:130,height:130}} source={require("./assets/fashion/hood.png")} /></View>)}
        {8<day.temp.day && day.temp.day<=11 && (<View style={styles.pants}><Image style={{width:130,height:130}} source={require("./assets/fashion/denim-pants.png")} /></View>) }
        {8<day.temp.day && day.temp.day<=11 && (<View style={styles.shoes}><Image style={{width:130,height:130}} source={require("./assets/fashion/sneakers.png")} /></View>)}
        </View>
        <View>
        {11<day.temp.day && day.temp.day<=16 && (<View style={styles.outer}><Image style={{width:130,height:130}} source={require("./assets/fashion/cardigan.png")} /></View>)}
        {11<day.temp.day && day.temp.day<=16 && (<View style={styles.shirt}><Image style={{width:130,height:130}} source={require("./assets/fashion/Tshirt.png")} /></View>)}
        {11<day.temp.day && day.temp.day<=16 && (<View style={styles.pants}><Image style={{width:130,height:130}} source={require("./assets/fashion/denim-pants.png")} /></View>)}
        {11<day.temp.day && day.temp.day<=16 && (<View style={styles.shoes}><Image style={{width:130,height:130}} source={require("./assets/fashion/sneakers.png")} /></View>)}
        </View>
        <View>
        {16<day.temp.day && day.temp.day<=19 && (<View style={styles.outer}><Image style={{width:130,height:130}} source={require("./assets/fashion/varsity.png")} /></View>)}
        {16<day.temp.day && day.temp.day<=19 && (<View style={styles.shirt}><Image style={{width:130,height:130}} source={require("./assets/fashion/hood.png")} /></View>)}
        {16<day.temp.day && day.temp.day<=19 && (<View style={styles.pants}><Image style={{width:130,height:130}} source={require("./assets/fashion/denim-pants.png")} /></View>)}
        {16<day.temp.day && day.temp.day<=19 && (<View style={styles.shoes}><Image style={{width:130,height:130}} source={require("./assets/fashion/sneakers.png")} /></View>)}
        </View>
        <View>
        {19<day.temp.day && day.temp.day<=22 && (<View style={styles.outer}><Image style={{width:130,height:130}} source={require("./assets/fashion/varsity.png")} /></View>)}
        {19<day.temp.day && day.temp.day<=22 && (<View style={styles.shirt}><Image style={{width:130,height:130}} source={require("./assets/fashion/hood.png")} /></View>)}
        {19<day.temp.day && day.temp.day<=22 && (<View style={styles.pants}><Image style={{width:130,height:130}} source={require("./assets/fashion/denim-pants.png")} /></View>)}
        {19<day.temp.day && day.temp.day<=22 && (<View style={styles.shoes}><Image style={{width:130,height:130}} source={require("./assets/fashion/sneakers.png")} /></View>)}
        </View>
        <View>
        {22<day.temp.day && day.temp.day<=27 && (<View style={styles.outer}><Image style={{width:130,height:130}} source={require("./assets/fashion/varsity.png")} /></View>)}
        {22<day.temp.day && day.temp.day<=27 && (<View style={styles.shirt}><Image style={{width:130,height:130}} source={require("./assets/fashion/Tshirt.png")} /></View>)}
        {22<day.temp.day && day.temp.day<=27 && (<View style={styles.pants}><Image style={{width:130,height:130}} source={require("./assets/fashion/denim-pants.png")} /></View>)}
        {22<day.temp.day && day.temp.day<=27 && (<View style={styles.shoes}><Image style={{width:130,height:130}} source={require("./assets/fashion/sneakers.png")} /></View>)}
        </View>
        <View>
        {27<day.temp.day && day.temp.day && (<View style={styles.outer}><Image style={{width:130,height:130}} source={require("./assets/fashion/varsity.png")} /></View>)}
        {27<day.temp.day && day.temp.day && (<View style={styles.shirt}><Image style={{width:130,height:130}} source={require("./assets/fashion/Tshirt.png")} /></View>)}
        {27<day.temp.day && day.temp.day && (<View style={styles.pants}><Image style={{width:130,height:130}} source={require("./assets/fashion/shorts.png")} /></View>)}
        {27<day.temp.day && day.temp.day && (<View style={styles.shoes}><Image style={{width:130,height:130}} source={require("./assets/fashion/sneakers.png")} /></View>)}
        </View>
        </View>

      <View style={{}}>
      </View>
      </ScrollView>
    </ImageBackground>
      )))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3FA",
  },
  city: {
    marginTop:60,
    marginBottom:30,
  },
  cityName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "black",
  },
  day: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
  },
  temp: {
    marginTop:50,
    fontWeight: "600",
    fontSize: 40,
    color: "black",
  },
  description: {
    marginTop: 8,
    fontSize: 30,
    color: "black",
    fontWeight: "500",
  },
  tinyText: {
    marginTop: -5,
    fontSize: 25,
    color: "black",
    fontWeight: "500",
  },
  garo:{
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bgImage: {width: '100%', height: '100%'},
  logo:{
    width:55,
    height:55,
    alignItems:"baseline",
    marginTop:35,
    marginLeft:10
  },
  loading: {
    flex: 1,
  },
  text :{
    color: "#2c2d2c",
    fontSize: 30
  },
  recommend:{
  },
  outer:{
    marginTop:40,
    marginLeft:30,
    alignItems:"baseline",
  },
  shirt:{
    marginTop:30,
    marginRight:30,
    alignItems:"flex-end"
  },
  pants:{
    marginTop:30,
    marginLeft:30,    
    alignItems:"baseline"
  },
  shoes:{
    marginTop:30,
    marginRight:30,
    alignItems:"flex-end"
  }
});