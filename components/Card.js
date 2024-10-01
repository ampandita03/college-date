import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";
const Card = () => {
  const screenWidth = Dimensions.get("window").width;
  console.log(screenWidth);
  const route = useRoute();
  const { accessToken } = route.params;
  const navigation = useNavigation();
  const [cardImage, setCardImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://3.6.112.15:8081/newUser/addCardPicture",
        {
          method: "POST",
          body: JSON.stringify({ image: cardImage }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const result = await response.text();
      console.warn(result);

      if (result === "0") {
        console.warn("card image uploaded successfully!");
        setIsLoading(false);
        navigation.navigate("TabNavigator");
      } else {
        Alert.alert("Something went wrong!");
        setIsLoading(false);
      }
    } catch (error) {
      console.warn(error);
      setIsLoading(false);
    }
  };
  const pickCardImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission to access the media library is required!");
      return;
    }

    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
      base64: true,
    });

    if (!pickedImage.canceled) {
      const finalImage = pickedImage.assets[0].base64;
      setCardImage(finalImage);
      console.warn(cardImage);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="h-24 mt-5">
        <Text className="text-3xl font-bold mt-4 ml-10">Card Picture</Text>
        <Text className="text-base ml-10 w-72 mt-2">
          Card picture will be shown for matching the profile.
        </Text>
      </View>

      <TouchableOpacity
        className="h-4/6 justify-center items-center"
        onPress={pickCardImage}
      >
        {cardImage ? (
          <Image
            source={{ uri: `data:image/png;base64,${cardImage}` }}
            className="h-80 w-80"
          />
        ) : (
          <Image source={require("../assets/images/Card.png")} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-app-color h-14 w-80 self-center justify-center rounded-lg"
        onPress={uploadImage}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-lg text-white self-center font-medium text-center">
            Continue
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Card;
