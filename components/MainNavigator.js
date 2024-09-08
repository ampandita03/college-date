import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "./StartScreen";
import Signup from "./Signup";
import Login from "./Login";
import Email from "./Email";
import Otp from "./Otp";
import NameScreen from "./NameScreen";
import Profile from "./Profile";
import Gender from "./Gender";
import Interest from "./Interest";
import Contacts from "./Contacts";
import Friend from "./Friend";
import Notification from "./Notification";
import Card from "./Card";
import Home from "./Home";
import TabNavigator from "./TabNavigator";
const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Email"
        component={Email}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NameScreen"
        component={NameScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Gender"
        component={Gender}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Interest"
        component={Interest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Friend"
        component={Friend}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Card"
        component={Card}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
