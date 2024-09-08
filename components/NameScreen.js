import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";


const NameScreen = () => {
  const route = useRoute();
  const { emailToken } = route.params;
  const navigation = useNavigation();
  const [username, setuserName] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [confirmVisible, setConfirmVisible] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };
  const toggleConfirm = () => {
    setConfirmVisible(!confirmVisible);
  };
  const handleUsername = async () => {
    try {
      const response = await fetch(
        "http://3.6.112.15:8081/newUser/createNewUser",
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${emailToken}`,
          },
        }
      );

      const result = await response.json();
        console.warn(result.accessToken);
      if (result) {
        navigation.navigate("Profile", { username });
        console.log(username);
      } else {
        Alert.alert("Username is already taken, please choose another.");
      }
    } catch (error) {
      Alert.alert("An error occurred", error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        <Text className="text-4xl font-bold ml-10 mt-10">UserName</Text>
        <Text className="ml-10 mt-2 mr-10 text-lg">
          Please enter a unique username that will be used for identity.
        </Text>
      </View>

      <View>
        <TextInput
          placeholder="Username"
          placeholderTextColor="gray"
          className="top-8 h-14 w-80 self-center border rounded-md pl-4"
          keyboardType="email-address"
          onChangeText={(name) => setuserName(name)}
        />

        <View className="top-12 flex-row justify-center items-center">
          <TextInput
            placeholder="Password"
            placeholderTextColor="gray"
            className="  h-14 w-80 self-center border rounded-md pl-4"
            keyboardType="default"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isVisible}
          />
          <TouchableOpacity
            className="absolute right-14"
            onPress={toggleVisible}
          >
            {isVisible ? (
              <Ionicons name="eye-off-outline" size={24} color="black" />
            ) : (
              <Ionicons name="eye-outline" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>

        <View className="top-16 flex-row justify-center items-center">
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            className="h-14 w-80 self-center border rounded-md pl-4"
            keyboardType="default"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={confirmVisible}
          />
          <TouchableOpacity
            className="absolute right-14"
            onPress={toggleConfirm}
          >
            {confirmVisible ? (
              <Ionicons name="eye-off-outline" size={24} color="black" />
            ) : (
              <Ionicons name="eye-outline" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="top-24 bg-app-color h-14 w-80 self-center justify-center rounded-lg"
          onPress={handleUsername}
        >
          <Text className="text-lg text-white self-center font-medium">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NameScreen;
