import {
  View,
  Text,
  SafeAreaView,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";

const Match = () => {
  return (
    <SafeAreaView>
      <View className=" h-14  flex-row items-center justify-center">
        <Text className="text-3xl font-bold text-center mt-2">Discover</Text>
        <TouchableOpacity className="absolute right-4">
          <Image
            source={require("../assets/images/filter.png")}
            className="h-10 w-10 "
          />
        </TouchableOpacity>
      </View>

      <View className="p-4 items-center">
        <Image source={require("../assets/images/HomeCard.png")} />
      </View>

      <View className="flex-row  h-28 items-center  justify-evenly ">
        <TouchableOpacity className="bg-white h-16 w-16 z-10 justify-center items-center rounded-full">
            <Image source={require("../assets/images/Cross.png")}/>
        </TouchableOpacity>
        <TouchableOpacity className="bg-app-color h-24 w-24 z-10 justify-center items-center rounded-full  ">
        <Image source={require("../assets/images/Like.png")} className="self-center"/>
        </TouchableOpacity>
        <View className="bg-white h-16 w-16 z-10 justify-center items-center rounded-full 
    ">
        <Image source={require("../assets/images/Star.png")}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Match;
