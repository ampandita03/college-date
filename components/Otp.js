import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
const Otp = () => {
  const route = useRoute();
  const { email } = route.params;
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false);
  const [counter, setCounter] = useState(59);
  const [borderColorIn1, setBorderColorIn1] = useState(false);
  const [borderColorIn2, setBorderColorIn2] = useState(false);
  const [borderColorIn3, setBorderColorIn3] = useState(false);
  const [borderColorIn4, setBorderColorIn4] = useState(false);
  const [backgroundIn1, setBackgroundIn1] = useState(false);
  const [backgroundIn2, setBackgroundIn2] = useState(false);
  const [backgroundIn3, setBackgroundIn3] = useState(false);
  const [backgroundIn4, setBackgroundIn4] = useState(false);
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

  const handleOtp = async () => {
    const otp = `${otp1}${otp2}${otp3}${otp4}`; 

    try {
      setisLoading(true);
      const response = await fetch(
        "http://3.6.112.15:8081/auth/otpVerification",
        {
          method: "POST",
          body: JSON.stringify({ email, otp }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const emailToken = await response.text();
      console.log(emailToken);
  
      if (emailToken && emailToken != 0) {
        setisLoading(false);
        navigation.navigate("NameScreen", { email, emailToken });
      } else {
        Alert.alert("Invalid OTP. Please try again.");
        setisLoading(false);
        clearOtp(); 
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
      setisLoading(false); 
      clearOtp();
    }
  
  };
  
  const clearOtp = () => {
    console.log("Clearing OTP"); 
    setOtp1("");
    setOtp2("");
    setOtp3("");
    setOtp4("");
    inputRef1.current?.focus(); 
    setBackgroundIn1(false);
    setBackgroundIn2(false);
    setBackgroundIn3(false);
    setBackgroundIn4(false);
    setBorderColorIn2(false);
    setBorderColorIn3(false);
    setBorderColorIn4(false);
    
  };  
 
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter > 0) {
          return prevCounter - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedCounter =
    counter >= 10 ? counter.toString() : "0" + counter.toString();

  const handleKeyPress = (e, refToFocus, setBorderColor, setBackground ,clearCurrentOtp) => {
    if (e.nativeEvent.key === "Backspace") {
      if (refToFocus) {
        refToFocus.current.focus();
        setBackground(false);
        setBorderColor(false);
        clearCurrentOtp(); 
      } else {
      
        clearCurrentOtp();
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 self-center">
      <Text className="mt-10 text-6xl font-medium self-center">
        00:{formattedCounter}
      </Text>

      <Text className="text-center mt-6 text-lg">
        Type the verification code we’ve sent you
      </Text>

      <View className="w-80 h-24 mt-5 flex-row justify-evenly items-center">
        <TextInput
          ref={inputRef1}
          placeholder="0"
          placeholderTextColor="gray"
          textAlign="center"
          keyboardType="number-pad"
          maxLength={1}
          value={otp1}
          className={`w-16 h-16 border rounded-xl ${
            borderColorIn1 ? "border-app-color" : "border-black"
          } ${backgroundIn1 ? "bg-app-color text-white" : "bg-white"}`}
          style={styles.input1}
          onChangeText={(val) => {
            if (val) {
              setOtp1(val);
              console.warn(otp1);
              inputRef2.current.focus();
              setBackgroundIn1(true);
              setBorderColorIn2(true);
            } else {
              setBackgroundIn1(false);
            }
          }}
          onFocus={() => setBorderColorIn1(true)}
          onKeyPress={(e) =>
            handleKeyPress(e, null, setBorderColorIn1, setBackgroundIn1, () => setOtp1(""))
          }
        />

        <TextInput
          ref={inputRef2}
          placeholder="0"
          placeholderTextColor="gray"
          textAlign="center"
          keyboardType="number-pad"
          maxLength={1}
          value={otp2}
          className={`w-16 h-16 border rounded-xl ${
            borderColorIn2 ? "border-app-color" : "border-black"
          } ${backgroundIn2 ? "bg-app-color text-white" : "bg-white"}`}
          style={styles.input1}
          onChangeText={(val) => {
            if (val) {
              inputRef3.current.focus();
              setOtp2(val);

              setBackgroundIn2(true);
              setBorderColorIn3(true);
            } else {
              setBackgroundIn2(false);
            }
          }}
          onFocus={() => setBorderColorIn2(true)}
          onKeyPress={(e) =>
            handleKeyPress(e, inputRef1, setBorderColorIn2, setBackgroundIn2,() => setOtp2(""))
          }
        />

        <TextInput
          ref={inputRef3}
          placeholder="0"
          placeholderTextColor="gray"
          textAlign="center"
          keyboardType="number-pad"
          maxLength={1}
          value={otp3}
          className={`w-16 h-16 border rounded-xl ${
            borderColorIn3 ? "border-app-color" : "border-black"
          } ${backgroundIn3 ? "bg-app-color text-white" : "bg-white"}`}
          style={styles.input1}
          onChangeText={(val) => {
            if (val) {
              inputRef4.current.focus();
              setOtp3(val);
              setBackgroundIn3(true);
              setBorderColorIn4(true);
            } else {
              setBackgroundIn3(false);
            }
          }}
          onFocus={() => setBorderColorIn3(true)}
          onKeyPress={(e) =>
            handleKeyPress(e, inputRef2, setBorderColorIn3, setBackgroundIn3,() => setOtp3(""))
          }
        />

        <TextInput
          ref={inputRef4}
          placeholder="0"
          placeholderTextColor="gray"
          textAlign="center"
          keyboardType="number-pad"
          maxLength={1}
          value={otp4}
          className={`w-16 h-16 border rounded-xl ${
            borderColorIn4 ? "border-app-color" : "border-black"
          } ${backgroundIn4 ? "bg-app-color text-white" : "bg-white"}`}
          style={styles.input1}
          onChangeText={(val) => {
            if (val) {
              setOtp4(val);
              setBackgroundIn4(true);
            } else {
              setBackgroundIn4(false);
            }
          }}
          onFocus={() => setBorderColorIn4(true)}
          onKeyPress={(e) =>
            handleKeyPress(e, inputRef3, setBorderColorIn4, setBackgroundIn4,() => setOtp4(""))
          }
        />
      </View>
      <TouchableOpacity
        className="flex-1  self-center  top-5"
        onPress={() => setCounter(59)}
      >
        <View className="justify-center items-center">
          {isLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Button title="Verify Otp" onPress={handleOtp} />
          )}
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input1: {
    fontSize: 24,
  },
});

export default Otp;
