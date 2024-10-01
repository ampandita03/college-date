import React from "react";
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as AppleAuthentication from 'expo-apple-authentication';

const Signup = () => {
    const navigation = useNavigation()
    const handleCreateAccount=()=>{
        navigation.navigate('Email');
    }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="max-w-lg h-72 justify-center">
        <Image
          className="self-center"
          source={require("../assets/images/trademark.png")}
        />
      </View>

      <View className=" max-w-lg h-36">
        <Text className="font-mediumxx text-lg text-black self-center">
          Sign up to continue
        </Text>

        <TouchableOpacity className="bg-app-color w-72 self-center h-16 justify-center rounded-xl top-6" onPress={handleCreateAccount}>
          <Text className="self-center font-semibold text-lg text-white">
            Continue with email
          </Text>
        </TouchableOpacity>
      </View>

      <View className=" top-10 flex-row justify-evenly">
        <View className=" w-28 h-0 items-center border-t-0.5 "></View>

        <View className="   h-6 bottom-3 items-center">
          <Text className="font-medium text-base">or sign up with</Text>
        </View>

        <View className=" bg-white w-28 h-0  items-center border-t-0.5 "></View>
      </View>

      <View className="w-48 h-28 top-16  flex-row self-center gap-2">
        <TouchableOpacity className="bg-white h-20 w-20 self-center  rounded-lg justify-center ">

           <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE}
        cornerRadius={8}
        style={styles.button}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],

              
            });
            console.warn(credential.email);
          } catch (e) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
                Alert.alert("Something went wrong!");
            } else {
            }
          }
        }}
      />
        </TouchableOpacity>

        <TouchableOpacity className="bg-white h-10 w-44 self-center  border rounded-lg justify-center border-black  flex-row ">
          <Image
            className="self-center h-5 w-5 mr-1"
            source={require("../assets/images/facebook.png")}
          />
          <Text className="justify-center self-center font-semibold">
            Sign in with Facebook
          </Text>
        </TouchableOpacity>
      </View>

      <View className=" w-72 h-8 top-24 self-center justify-evenly flex-row">
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 150,
    height: 40,
    marginLeft:-80,

  },
});

export default Signup;
