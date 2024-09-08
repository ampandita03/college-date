import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Notification = () => {
  const navigation = useNavigation();
  const handleSkip = () => {
    navigation.navigate("Card");
  };
  return (
    <SafeAreaView className="flex-1">
      <View className=" h-20 justify-center items-end">
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-app-color font-bold text-base mr-4">Skip</Text>
        </TouchableOpacity>
      </View>

      <View className="h-3/6 justify-center items-center">
        <Image source={require("../assets/images/chat.png")} />
      </View>
      <View className=" h-40 items-center">
        <Text className="text-3xl font-bold text-center">
          Enable notification’s
        </Text>

        <Text className="text-base text-center mt-2 w-80 ">
          Get push-notification when you get the match or receive a message.
        </Text>
      </View>

      <TouchableOpacity
        className="
           bg-app-color h-14 w-80 self-center justify-center rounded-lg"
      >
        <Text className="text-lg text-white self-center font-medium text-center">
          I want to be notified
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Notification;
