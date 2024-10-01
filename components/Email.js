import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
const Email = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigation = useNavigation();


  
  const handleContinue = async () => {
    try {
      setisLoading(true);
      const fetchData = await fetch("http://3.6.112.15:8081/auth/signup", {
        method: "POST",
        body: email,
        headers: {
          "Content-Type": "application/text",
        },
      });

      const result = await fetchData.text();
      console.log(result);

      if (result!="0") {
            navigation.navigate("Otp", { email });
      } else {
        setisLoading(false);
        Alert.alert("Email already taken!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        <Text className="text-4xl font-bold ml-10 mt-10">My Email</Text>
        <Text className="ml-10 mt-2 mr-10 text-lg">
          Please enter your valid Email Id. We will send you a 4-digit code to
          verify your account.
        </Text>
      </View>

      <View>
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          className=" top-8 h-14 w-80 self-center border rounded-md pl-4"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          className="top-20 bg-app-color h-14 w-80 self-center justify-center rounded-lg"
          onPress={handleContinue}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-lg text-white self-center font-medium">
              Continue
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Email;
