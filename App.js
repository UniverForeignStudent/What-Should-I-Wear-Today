import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {View,Text,Dimensions,ActivityIndicator,StyleSheet,ImageBackground,ScrollView,Image} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import Loading from "./Loading";
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
  const [city, setCity] = useState("Loading...");
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
      <ImageBackground source={require("./assets/wave.png")} style={styles.bgImage}>
      <StatusBar style="dark" />
      <View style={{flexDirection: "row"}}>
        <Image style={styles.logo} source={require("./assets/logo.png")}></Image>
        <Image style={{marginTop:0,height:70,width:70,marginTop:28,}} source={require("./assets/name.png")}></Image>
      </View>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
          <ActivityIndicator
            color="white"
            style={{ marginTop: 10 }}
            size="large"
          />
        </View>
      ) : (
        days.map((day, index) => (
          <View key={index} style={styles.day}>
            <View style={{
              alignItems: "center",
              width: "100%",
            }}>
            </View>
            <View style={{justifyContent: "center", alignItems: "center",}}>
            <Text>{new Date(day.dt * 1000).toString().substring(0, 10)}</Text>
              <Fontisto name={icons[day.weather[0].main]} size={200} color="black"/>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
  
            </View>
            <View style={{flexDirection: "row",justifyContent: "space-around",marginTop:90}}>
              <View style={{borderRadius:40, alignItems:"center",justifyContent:"center",backgroundColor:"white",marginHorizontal:10, width:70, height:190}}>
              <Image style={{alingself:"center",width:50,height:50}} source={require("./assets/day.png")}/>
              <Text style={{fontWeight: 'bold',color:"black",fontSize:11}}>{day.temp.day}</Text>
              </View>
              <View style={{borderRadius:70, alignItems:"center",justifyContent:"center",backgroundColor:"white",marginHorizontal:10, width:70, height:190}}>
              <Image style={{alingself:"center",width:50,height:50}} source={require("./assets/night.png")}/>
              <Text style={{fontWeight: 'bold',color:"black",fontSize:11}}>{day.temp.night}</Text>
              </View><View style={{borderRadius:70, alignItems:"center",justifyContent:"center",backgroundColor:"white",marginHorizontal:10, width:70, height:190}}>
              <Image style={{alingself:"center",width:50,height:50}} source={require("./assets/min.png")}/>
              <Text style={{fontWeight: 'bold',color:"black",fontSize:11}}>{day.temp.min}</Text>
              </View><View style={{borderRadius:70, alignItems:"center",justifyContent:"center",backgroundColor:"white",marginHorizontal:10, width:70, height:190}}>
              <Image style={{alingself:"center",width:50,height:50}} source={require("./assets/max.png")}/>
              <Text style={{fontWeight: 'bold',color:"black",fontSize:11}}>{day.temp.max}</Text>
              </View>
            </View> 
          </View>
            
          ))
        )}
      </ScrollView>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3FA",
  },
  city: {
    marginTop:30,
    marginBottom:30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 30,
    fontWeight: "500",
    color: "black",
  },
  weather: {},
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

    }
});