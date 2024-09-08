import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Contacts from "expo-contacts";

const ContactList = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const handleContinue=()=>{
    navigation.navigate('Notification');
  }
  useEffect(() => {
    const getContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.FirstName, Contacts.Fields.PhoneNumbers],
        });
        console.log(data);
        if (data.length > 0) {
          setContacts(data);
        }
      }
    };
    getContacts();
  }, []);

  return (
    <>
    <View className="justify-center items-center mt-10 p-2 mb-5">
        <Text className="text-2xl font-bold">
            Contact List
        </Text>
    </View>
    <ScrollView className="mb-10">
    <View className="p-1 ">
      {contacts.map((contact, index) => {
        console.log(contact);
        return (
          <View key={index} className="flex-row gap-10 justify-evenly 
          items-center">
            <Text className="text-lg font-normal w-24 text-center">
              {contact.firstName ? contact.firstName : "No name available"}
            </Text>
            {contact.phoneNumbers && contact.phoneNumbers.length > 0 && (
              <Text className="text-lg font-normal text-center">
                {contact.phoneNumbers[0]?.number
                  ? contact.phoneNumbers[0].number
                  : "No number available"}
              </Text>
            )}
          </View>
        );
      })}
    </View>
    </ScrollView>
    <View>
    <TouchableOpacity className="bg-app-color h-14 w-80 self-center justify-center rounded-lg mb-10" onPress={handleContinue}>
                <Text className="text-lg text-white self-center font-medium">
                    Continue
                </Text>
            </TouchableOpacity>
            </View>
    </>
  );
};

export default ContactList;
