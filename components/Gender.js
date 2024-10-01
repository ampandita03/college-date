import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
const Gender = () => {
  const route = useRoute();
  const { accessToken } = route.params;
    const navigation = useNavigation();
  const [isGender, setisGender] = useState("0");
  const genderApi=async()=>{

    try{
    const response = await fetch("http://3.6.112.15:8081/newUser/addGender",{
      method:"POST",
      body : isGender,
      headers:{
        'Content-Type':'application/text',
        Authorization : `Bearer ${accessToken}`
      }
    });
    const result = await response.text();
    console.warn(result);
    if(result==='0' || result ==="1"){
      console.warn("Navigating to Interest screen")
      navigation.navigate('Interest',{ accessToken });
    }else{
      Alert.alert("Something went wrong!");
    }
  }
  catch(error){
    console.warn(error);
  }
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="h-28 justify-center  relative ml-3">
        <Text className="text-black text-4xl font-bold text-left ml-5">
          I am a .....
        </Text>
      </View>

      <TouchableOpacity
        className={`relative top-6 rounded-lg border-0.5 h-16
       w-80 self-center p-5 justify-center ${
         isGender === "0" ? "bg-app-color border-0" : ""
       }`}
        onPress={() => setisGender("0")}
      >
        <Text
          className={`font-medium text-base ${
            isGender === "0" ? "text-white" : "text-black"
          }`}
        >
          Male
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`relative top-12 rounded-lg border-0.5 h-16
       w-80 self-center p-5 justify-center ${
         isGender === "1" ? "bg-app-color border-0" : ""
       } `}
        onPress={() => setisGender("1")}
      >
        <Text
          className={`font-medium text-base ${
            isGender === "1" ? "text-white" : "text-black"
          }`}
        >
          Female
        </Text>
      </TouchableOpacity>

      <View className="absolute bottom-32  self-center">
        <TouchableOpacity className=" top-16 bg-app-color h-14 w-80 self-center justify-center rounded-lg" onPress={genderApi}>
          <Text className="text-lg text-white self-center font-medium">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Gender;
