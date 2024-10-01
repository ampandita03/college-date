import React from 'react';
import {View,Text,SafeAreaView,Image,TouchableOpacity, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login=()=>{
  const navigation=useNavigation();
  const handleSignIn=()=>{
    navigation.navigate('TabNavigator');
  }
    return(
        <SafeAreaView className="flex-1 bg-white">
        <View className="max-w-lg h-60 justify-center">
          <Image
            className="self-center"
            source={require("../assets/images/trademark.png")}
          />
        </View>
  
        <View className=" max-w-lg h-36">
          <Text className="font-mediumxx text-lg text-black self-center">
            Sign In to continue
          </Text>
        <TextInput placeholder='Email' placeholderTextColor="gray" className=" top-6 h-14 w-80 self-center border rounded-md pl-4"/>

        <TextInput placeholder='Password' placeholderTextColor="gray" secureTextEntry={true} className=" top-12 h-14 w-80 self-center border rounded-md pl-4"/>
        <TouchableOpacity className="top-20 bg-app-color h-14 w-60 self-center justify-center rounded-lg" onPress={handleSignIn}>
            <Text className="text-lg text-white self-center font-medium">Sign In</Text>
        </TouchableOpacity>
        </View>
  
        <View className=" top-48 flex-row justify-evenly">
          <View className=" w-28 h-0 items-center border-t-0.5 "></View>
  
          <View className="   h-6 bottom-3 items-center">
            <Text className="font-medium text-base">or sign In with</Text>
          </View>
  
          <View className=" bg-white w-28 h-0  items-center border-t-0.5 "></View>
        </View>
  
        <View className="w-48 h-28 top-48 self-center flex-row justify-evenly gap-2">
          <TouchableOpacity className="bg-white h-14 w-14 self-center border rounded-lg justify-center border-gray-400">
            <Image
              className="self-center"
              source={require("../assets/images/google.png")}
            />
          </TouchableOpacity>
  
          <TouchableOpacity className="bg-white h-14 w-14  self-center border rounded-lg justify-center border-gray-400">
            <Image
              className="self-center"
              source={require("../assets/images/facebook.png")}
            />
          </TouchableOpacity>
        </View>
  
        <View className=" w-72 h-8 top-48 self-center justify-evenly flex-row">
          <TouchableOpacity className="self-center justify-evenly flex-row">
            <Text className="text-app-color font-medium self-center text-base">
              Terms of use
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity className="self-center justify-evenly flex-row">
            <Text className="text-app-color font-medium self-center text-base">
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  
    )
}

export default Login;