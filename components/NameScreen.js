import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const NameScreen = () => {
  const route = useRoute();
  const { emailToken } = route.params;
  const navigation = useNavigation();
  const [username, setUserName] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [confirmVisible, setConfirmVisible] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleVisible = () => setIsVisible(!isVisible);
  const toggleConfirm = () => setConfirmVisible(!confirmVisible);

  const handleUsername = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Password and Confirm Password are not the same!");
      return;
    }

    try {
      const response = await fetch("http://3.6.112.15:8081/newUser/createNewUser", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${emailToken}`,
        },
      });

      const result = await response.json();
      const accessToken = result.accessToken;

      if (response.ok && accessToken!="") {
        navigation.navigate("Profile", { accessToken });
        console.log("Username:", username);
        console.warn("Email Token:", emailToken);
        console.warn("Access Token:", accessToken);
      } else {
        Alert.alert("Username is already taken, please choose another.");
      }
    } catch (error) {
      Alert.alert("An error occurred", error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="ml-10 mt-10">
        <Text className="text-4xl font-bold">Username</Text>
        <Text className="mt-2 mr-10 text-lg">
          Please enter a unique username that will be used for identity.
        </Text>
      </View>

      <View>
        <TextInput
          placeholder="Username"
          placeholderTextColor="gray"
          className="top-8 h-14 w-80 self-center border rounded-md pl-4"
          keyboardType="default"
          onChangeText={setUserName}
        />

        <View className="top-12 flex-row justify-center items-center">
          <TextInput
            placeholder="Password"
            placeholderTextColor="gray"
            className="h-14 w-80 self-center border rounded-md pl-4"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isVisible}
          />
          <TouchableOpacity
            className="absolute right-14"
            onPress={toggleVisible}
          >
            <Ionicons name={isVisible ? "eye-off-outline" : "eye-outline"} size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="top-16 flex-row justify-center items-center">
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            className="h-14 w-80 self-center border rounded-md pl-4"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={confirmVisible}
          />
          <TouchableOpacity
            className="absolute right-14"
            onPress={toggleConfirm}
          >
            <Ionicons name={confirmVisible ? "eye-off-outline" : "eye-outline"} size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="top-24 bg-app-color h-14 w-80 self-center justify-center rounded-lg"
          onPress={handleUsername}
        >
          <Text className="text-lg text-white text-center font-medium">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NameScreen;
