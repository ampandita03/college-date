import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "react-native-vector-icons";
import Match from "./Match";
import Liked from "./Liked";
import Chat from "./Chat";
import Account from "./Account";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel:false}}>
      <Tab.Screen
        name="Match"
        component={Match}
        options={{
          tabBarIcon: ({focused}) => (
           <Image source={focused ?require('../assets/images/Match.png'):require('../assets/images/MatchInactive.png')}/>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Liked"
        component={Liked}
        options={{
            tabBarIcon: ({focused}) => (
             <Image source={focused ?require('../assets/images/LikedActive.png'):require('../assets/images/LikedInactive.png')}/>
            ),
            headerShown: false,
          }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
            tabBarIcon: ({focused}) => (
             <Image source={focused ?require('../assets/images/ChatActive.png'):require('../assets/images/ChatInactive.png')}/>
            ),
            headerShown: false,
          }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
            tabBarIcon: ({focused}) => (
             <Image source={focused ?require('../assets/images/AccountActive.png'):require('../assets/images/AccountInactive.png')}/>
            ),
            headerShown: false,
          }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
