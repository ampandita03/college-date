import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator"; 
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Autocomplete from "react-native-autocomplete-input";

const Profile = () => {
  const route = useRoute();
  const { accessToken } = route.params;
  const navigation = useNavigation();
  const [profile, setProfile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [query, setQuery] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [collegeId, setCollegeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    setDob(formattedDate);
    setIsDatePickerVisible(false);
  };

  const uploadBasicDetails = async () => {
    if (
      profile.trim() === "" ||
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      selectedCollege.trim() === "" ||
      dob.trim() === ""
    ) {
      Alert.alert("Enter all the required fields!");
      return;
    }
  
    console.warn("DATA UPLOADING..");
    
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://3.6.112.15:8081/newUser/addBasicDetails",
        {
          method: "POST",
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            collegeId: collegeId,
            collegeName: selectedCollege,
            image: profile,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const result = await response.text();
      console.warn(result);
  
      if (result==="0") { 
        navigation.navigate("Gender", { accessToken });
        Alert.alert("Profile Updated!");
        setIsLoading(false);
      }
    
      else{
        Alert.alert("Enter all the required fields!");
        setIsLoading(false);
      }}
     catch (error) {
      console.error("Upload failed", error);
      Alert.alert("Upload failed", error.message);
      setIsLoading(false);
    }
  };

  const fetchColleges = async (search) => {
    try {
      const response = await fetch(
        `http://3.6.112.15:8081/public/colleges?name=${search}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setFilteredColleges(data.slice(0, 10));
    } catch (error) {
      console.error("Failed to fetch colleges", error);
    }
  };

  useEffect(() => {
    if (query.length > 2) {
      fetchColleges(query);
    } else {
      setFilteredColleges([]);
    }
  }, [query]);

  const handleSelectedCollege = (college) => {
    setSelectedCollege(college.collegeName);
    setQuery(college.collegeName);
    setFilteredColleges([]);
    setCollegeId(college.id);
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission to access the media library is required!");
      return;
    }

    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!pickedImage.canceled) {
      const compressedImage = await compressImage(pickedImage.assets[0]);
      setProfile(compressedImage);
    }
  };

  const compressImage = async (image, format) => {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize: { width: 300 } }],
      {
        compress: 0.8,
        format: format === 'png' ? ImageManipulator.SaveFormat.PNG : ImageManipulator.SaveFormat.JPEG, 
        base64: true,
      }
    );
    return manipulatedImage.base64; 
  };
  return (
    <SafeAreaView className="flex-1 top-10">
      <View
        className="h-28 justify-center relative -mt-10"
        style={{ zIndex: 1 }}
      >
        <Text className="text-black text-4xl font-bold text-left ml-5">
          Profile Details
        </Text>
      </View>

      <View className="items-center relative" style={{ zIndex: 1 }}>
        <TouchableOpacity onPress={pickImage}>
          {profile ? (  
            <Image
              source={{ uri: `data:image/png;base64,${profile}` }}
              className="h-32 w-32 rounded-full"
            />
          ) : (
            <Image
              source={require("../assets/images/Profile.png")}
              className="h-32 w-32 rounded-full"
            />
          )}
          <View className="z-10 absolute top-24 right-0 bg-app-color rounded-full h-10 w-10 justify-center items-center">
            <MaterialIcons name="camera-alt" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <View
        className="relative top-2 justify-center h-44"
        style={{ zIndex: 3 }}
      >
        <TextInput
          placeholder="First Name"
          placeholderTextColor="gray"
          className="absolute top-5 h-14 w-80 self-center border rounded-md p-4"
          keyboardType="default"
          onChangeText={(e) => setFirstName(e)}
          style={{ zIndex: 1 }}
        />

        <TextInput
          placeholder="Last Name"
          placeholderTextColor="gray"
          className="absolute top-24 h-14 w-80 self-center border rounded-md p-4"
          keyboardType="default"
          onChangeText={(e) => setLastName(e)}
          style={{ zIndex: 1 }}
        />

        <View
          style={{
            zIndex: 999,
            position: "absolute",
            top: 80,
            width: "100%",
            height: 20,
          }}
        >
          <Autocomplete
            data={filteredColleges}
            defaultValue={query}
            onChangeText={(text) => setQuery(text)}
            placeholder="College Name"
            placeholderTextColor="grey"
            flatListProps={{
              keyExtractor: (item) => item.id.toString(),
              renderItem: ({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelectedCollege(item)}
                  className="h-10 p-2 border-0"
                >
                  <Text className="text-black text-xs">{item.collegeName}</Text>
                </TouchableOpacity>
              ),
            }}
            className="absolute h-14 w-80 top-20 mt-3 self-center border rounded-lg p-4 bg-transparent z-40"
            inputContainerStyle={styles.inputContainerStyle}
            listContainerStyle={{ maxHeight: 180, marginBottom: 20 }}
            scrollEnabled={true}
          />
        </View>
      </View>

      <View className="relative top-24 w-80 justify-center self-center">
        <TouchableOpacity
          className="h-14 bg-calender rounded-lg justify-center flex-row items-center z-20"
          onPress={showDatePicker}
        >
          <AntDesign name="calendar" size={24} color="#E94057" />
          {dob ? (
            <Text className="text-app-color font-bold ml-5">{dob}</Text>
          ) : (
            <Text className="text-app-color font-bold ml-5">
              Choose Date of Birth
            </Text>
          )}
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDate}
          onCancel={hideDatePicker}
        />
      </View>

      <View className="relative top-36 w-80 justify-center self-center">
        <TouchableOpacity
          className="h-14 bg-app-color rounded-lg justify-center"
          onPress={uploadBasicDetails}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-xl font-semibold text-center">
              Continue
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
});
