import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
const Gender = () => {
  const route = useRoute();
  const { userName, firstName, lastName, dob ,collegeName } = route.params;
    const navigation = useNavigation();
  const [isGender, setisGender] = useState(null);
    const handleNavigation=()=>{
        console.log(isGender)
        navigation.navigate('Interest',{ userName, firstName, lastName, dob ,collegeName,isGender });
        console.log(userName, firstName, lastName, dob ,collegeName,isGender);
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
         isGender === "Male" ? "bg-app-color border-0" : ""
       }`}
        onPress={() => setisGender("Male")}
      >
        <Text
          className={`font-medium text-base ${
            isGender === "Male" ? "text-white" : "text-black"
          }`}
        >
          Male
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`relative top-12 rounded-lg border-0.5 h-16
       w-80 self-center p-5 justify-center ${
         isGender === "Female" ? "bg-app-color border-0" : ""
       } `}
        onPress={() => setisGender("Female")}
      >
        <Text
          className={`font-medium text-base ${
            isGender === "Female" ? "text-white" : "text-black"
          }`}
        >
          Female
        </Text>
      </TouchableOpacity>

      <View className="absolute bottom-32  self-center">
        <TouchableOpacity className=" top-16 bg-app-color h-14 w-80 self-center justify-center rounded-lg" onPress={handleNavigation}>
          <Text className="text-lg text-white self-center font-medium">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Gender;
