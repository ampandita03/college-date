import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

const Liked = () => {
  const cardList = [
    { id: "0", card: require("../../college-date/assets/models/model.jpg") },
    { id: "1", card: require("../../college-date/assets/models/model2.jpg") },
    { id: "2", card: require("../../college-date/assets/models/model3.jpg") },
    { id: "3", card: require("../../college-date/assets/models/model4.jpg") },
    { id: "4", card: require("../../college-date/assets/models/model5.jpg") },
    { id: "5", card: require("../../college-date/assets/models/model6.jpg") },
    { id: "6", card: require("../../college-date/assets/models/model7.jpg") },
    { id: "7", card: require("../../college-date/assets/models/model8.jpg") },
    { id: "8", card: require("../../college-date/assets/models/model9.jpg") },
    { id: "9", card: require("../../college-date/assets/models/model10.jpg") },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-20 justify-between items-center flex-row">
        <Text className="text-3xl font-bold ml-8">Matches</Text>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/filterNew.png')}
            className="h-10 w-10 mr-10"
          />
        </TouchableOpacity>
      </View>

      <View className="h-14 justify-center">
        <Text className="text-base ml-8 mr-4">
          This is a list of people who have liked you and your matches.
        </Text>
      </View>

    <View className="flex-1 items-center">
      <FlatList
        data={cardList}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View className="m-2">
            <Image source={item.card} className="h-48 w-40 rounded-md " />
            <View className="bg-black h-12 z-10 rounded-b-md -top-12 opacity-60 justify-center">
              <View className="z-50 justify-evenly flex-row items-center">
                <TouchableOpacity>
                  <Entypo name="cross" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <AntDesign name="heart" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      </View>
    </SafeAreaView>
  );
};

export default Liked;
