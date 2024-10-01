import {
  View,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const Chat = () => {
  const { height, width } = Dimensions.get("window");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="w-screen justify-end " style={{ height: height - 130 }}>
      
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 0}
        >
          <View className="h-10 w-10 ">
            <Image source={require('../assets/models/model.jpg')} className="h-10 w-10"/>
          </View>
          <View className="flex-1 justify-end bg-white">
            <View className="flex-row items-center gap-5">
              <TextInput
                placeholder="Enter your message...."
                placeholderTextColor="grey"
                className=" h-16 w-80 border border-app-color rounded-lg left-2 p-4 text-lg"
                size={28}
              />
              <TouchableOpacity>
                <FontAwesome name="send" size={28} color="#E94057" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
          
      </View>
    </SafeAreaView>
  );
};

export default Chat;
