import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Autocomplete from "react-native-autocomplete-input";

const Profile = () => {
  const route = useRoute();
  const { username } = route.params;
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [query, setQuery] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

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
    formattedDate.toString();
    setDob(formattedDate);
    setIsDatePickerVisible(false);
  };

  const fetchColleges = async (search) => {
    const response = await fetch(
      `http://3.6.112.15:8081/public/colleges?name=${search}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    setFilteredColleges(data.slice(0, 10));
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
  };

  const handleConfirm = () => {

    if(firstName&&lastName&&selectedCollege&&dob){
      navigation.navigate("Gender", {
        username,
        firstName,
        lastName,
        dob,
        selectedCollege,
      });
    }
    else{
      Alert.alert("Fill all the required fields.")
    }
  
    console.log(username, firstName, lastName, dob, selectedCollege);
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted === false) {
      Alert.alert("Permission to access the media library is required!");
      return;
    }

    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickedImage.canceled) {
      setProfile(pickedImage.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1">
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
              source={{ uri: profile }}
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
          className="h-14 bg-calender rounded-lg justify-center flex-row items-center"
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
        ></DateTimePickerModal>
      </View>

      <View className="relative">
        <TouchableOpacity
          className="top-32 bg-app-color h-14 w-80 self-center justify-center rounded-lg"
          onPress={handleConfirm}
          style={{ zIndex: 1 }}
        >
          <Text className="text-lg text-white self-center font-medium">
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 0,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 350,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
});

export default Profile;
