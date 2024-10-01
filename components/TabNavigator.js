import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "react-native-vector-icons";
import Match from "./Match";
import Liked from "./Liked";
import Chat from "./Chat";
import Account from "./Account";
import { Image } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        name="Match"
        component={Match}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="cards-variant"
              size={24}
              color={focused ? "#E94057" : "grey"}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Liked"
        component={Liked}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="heart"
              size={24}
              color={focused ? "#E94057" : "grey"}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="chat"
              size={24}
              color={focused ? "#E94057" : "grey"}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={focused ? "#E94057" : "grey"}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
