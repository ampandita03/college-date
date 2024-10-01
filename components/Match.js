import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  PanResponder,
  Dimensions,
  Modal,
} from "react-native";
import React, { useRef, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

const screenWidth = Dimensions.get("window").width;

const Match = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rightSwipe, setRightSwipe] = useState(false);
  const [leftSwipe, setLeftSwipe] = useState(false);
  const [openModal, setOpenModel] = useState(false);
  const [toggleGender, setToggleGender] = useState(true);

  const LikeSwiper = () => {
    if (rightSwipe == false) {
      Animated.spring(pan, {
        toValue: { x: screenWidth + 100, y: 0 },
        useNativeDriver: false,
      }).start(() => swipeImage("right"));
      setRightSwipe(true);
    }
  };

  const notInterestedSwiper = () => {
    if (leftSwipe == false) {
      Animated.spring(pan, {
        toValue: { x: -screenWidth - 100, y: 0 },
        useNativeDriver: false,
      }).start(() => swipeImage("left"));
      setLeftSwipe(true);
    }
  };

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

  const swipeImage = (direction) => {
    let newIndex = currentIndex;

    if (direction === "right") {
      newIndex = (currentIndex + 1) % cardList.length;
    } else if (direction === "left") {
      newIndex = currentIndex + 1;
      if (newIndex >= cardList.length) {
        newIndex = 0;
      }
    }
    setCurrentIndex(newIndex);
    resetPosition();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dx > 120) {
          setRightSwipe(true);
          setLeftSwipe(false);
        } else if (gestureState.dx < -120) {
          setLeftSwipe(true);
          setRightSwipe(false);
        } else {
          setRightSwipe(false);
          setLeftSwipe(false);
        }

        // Animate the card's movement
        Animated.event(
          [
            null,
            {
              dx: pan.x,
              dy: new Animated.Value(0),
            },
          ],
          { useNativeDriver: false }
        )(e, gestureState);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(pan, {
            toValue: { x: screenWidth + 100, y: 0 },
            useNativeDriver: false,
          }).start(() => swipeImage("right"));
        } else if (gestureState.dx < -120) {
          Animated.spring(pan, {
            toValue: { x: -screenWidth - 100, y: 0 },
            useNativeDriver: false,
          }).start(() => swipeImage("left"));
        } else {
        
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();

    setRightSwipe(false);
    setLeftSwipe(false);
  };

  const rotate = pan.x.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: ["-30deg", "0deg", "30deg"],
  });

  return (
    <SafeAreaView>
      {/* Header */}
      <View className="h-14 flex-row items-center justify-center">
        <Text className="text-3xl font-bold text-center mt-2">Discover</Text>
        <TouchableOpacity
          className="absolute right-4 bg-white border-0.5 p-2 rounded-md"
          onPress={() => setOpenModel(true)}
        >
          <AntDesign name="filter" size={24} color="#E94057" />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true} 
          visible={openModal}
          onRequestClose={() => setOpenModel(false)}
          
        >
          <View className="flex-1 justify-end bg-opacity-50 ">
            <View className="bg-white rounded-lg h-80 p-4 shadow-lg">
              <View className="flex-row justify-center mt-3">
                <Text className="text-2xl font-bold">Filters</Text>
                <TouchableOpacity className="absolute justify-center right-2 items-center">
                  <Text className="text-app-color text-base font-bold self-center">
                    Clear
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="h-12 top-2 justify-center">
                <Text className="text-3xl font-semibold left-4">
                  Interested In
                </Text>
              </View>
              <View className="h-16 flex-row justify-evenly top-4">
                <TouchableOpacity
                  className={`h-12 w-36 border justify-center items-center rounded-lg ${
                    toggleGender ? "bg-app-color border-0" : "bg-white"
                  }`}
                  onPress={() => setToggleGender(true)}
                >
                  <Text
                    className={`font-bold text-black text-lg ${
                      toggleGender ? "text-white" : "text-black"
                    }`}
                  >
                    Female
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`h-12 w-36 border justify-center items-center rounded-lg ${
                    toggleGender ? "bg-white" : "bg-app-color border-0"
                  }`}
                  onPress={() => setToggleGender(false)}
                >
                  <Text
                    className={`font-bold text-black text-lg ${
                      toggleGender ? "text-black" : "text-white"
                    }`}
                  >
                    Male
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => setOpenModel(false)}
                className="bg-app-color h-14 w-64 justify-center self-center top-8 rounded-md"
              >
                <Text className="text-white font-bold text-base text-center">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {/* Card Swiper */}
      <View className="p-4 items-center justify-center">
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            pan.getLayout(),
            {
              transform: [{ rotate }, { translateY: 0 }],
              height: 500,
              width: 300,
            },
          ]}
        >
          <Image
            source={cardList[currentIndex].card}
            style={{ height: 500, width: 300, borderRadius: 20, zIndex: 0 }}
          />
        </Animated.View>

        {/* Heart Icon for Right Swipe */}
        {rightSwipe && (
          <View className="absolute z-10 bg-white p-5 rounded-full justify-center self-end right-12 opacity-50">
            <AntDesign name="heart" size={32} color="#E94057" />
          </View>
        )}

        {/* Cross Icon for Left Swipe */}
        {leftSwipe && (
          <View className="absolute z-10 bg-white p-5 rounded-full justify-center self-start left-12 opacity-50">
            <Entypo name="cross" size={32} color="orange" />
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View className="flex-row h-28 items-center justify-evenly relative top-2">
        <TouchableOpacity
          className="bg-white h-16 w-16 z-10 justify-center items-center rounded-full"
          onPress={notInterestedSwiper}
        >
          <Entypo name="cross" size={32} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-app-color h-24 w-24 z-10 justify-center items-center rounded-full"
          onPress={LikeSwiper}
        >
          <AntDesign name="heart" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-white h-16 w-16 z-10 justify-center items-center rounded-full">
          <AntDesign name="star" size={32} color="purple" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Match;
