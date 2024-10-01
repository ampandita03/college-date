import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const Interest = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { accessToken } = route.params;

  const [interest, setInterest] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState([]);

  const handleInterests = async () => {
    try {
      const response = await fetch("http://3.6.112.15:8081/newUser/addInterests", {
        method: "POST",
        body: JSON.stringify({ interests: selectedInterest.map((i) => i.name) }), 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.text();
      console.log(data);

      if (data === "0") {
        console.warn("Interests uploaded successfully");
        navigation.navigate("Notification", { accessToken });
      } else {
        console.warn("Something went wrong!");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    const fetchInterest = async () => {
      try {
        const response = await fetch("http://3.6.112.15:8081/public/getInterests");
        const data = await response.json();
        setInterest(data);
      } catch (error) {
        Alert.alert("Error:", error.message);
      }
    };
    fetchInterest();
  }, []);

  const toggleInterest = (item) => {
    if (selectedInterest.includes(item)) {
      setSelectedInterest(selectedInterest.filter((i) => i !== item));
    } else {
      setSelectedInterest([...selectedInterest, item]);
    }
  };

  const handleSkip = () => {
    navigation.navigate("Notification", { accessToken });
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="h-20 justify-center items-end">
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-app-color font-bold text-base mr-4">Skip</Text>
        </TouchableOpacity>
      </View>

      <View className="h-40">
        <Text className="font-bold text-4xl ml-4">Your interests</Text>
        <Text className="ml-4 mr-10 mt-3 text-base">
          Select a few of your interests and let everyone know what you’re
          passionate about.
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1, padding: 1 }}
        className="-mt-5"
      >
        <View className="flex-row flex-wrap items-center gap-1 justify-center p-1">
          {interest.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center border rounded-xl border-app-color p-2 ${
                selectedInterest.includes(item) ? "bg-app-color" : ""
              }`}
              onPress={() => toggleInterest(item)}
            >
              <Text
                className={`font-bold text-xs ${
                  selectedInterest.includes(item) ? "text-white" : ""
                }`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        className="mt-16 -top-10 bg-app-color h-14 w-80 self-center justify-center rounded-lg"
        onPress={handleInterests}
      >
        <Text className="text-lg text-white self-center font-medium">
          Confirm
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Interest;
