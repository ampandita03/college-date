import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
const Card = () => {
    const navigation = useNavigation();

    const handleContinue=()=>{
        navigation.navigate('TabNavigator')
    }
  return (
    <SafeAreaView className="flex-1">
      <View className=" h-24">
        <Text className="text-3xl font-bold mt-4 ml-10">Card Picture</Text>

        <Text className="text-base ml-10 w-72 mt-2">
          Card picture will be shown for matching the profile.
        </Text>
      </View>

      <View className=" h-4/6 justify-center items-center">
        <Image source={require("../assets/images/Card.png")} />
      </View>
      <TouchableOpacity
        className="
           bg-app-color h-14 w-80 self-center justify-center rounded-lg"
           onPress={handleContinue}
      >
        <Text className="text-lg text-white self-center font-medium text-center">
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Card;
