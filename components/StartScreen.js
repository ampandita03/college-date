import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const StartScreen = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [activeDot, setActiveDot] = useState(0);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const images = [
    require("../assets/images/girl1.png"),
    require("../assets/images/girl2.jpg"),
    require("../assets/images/girl3.jpg"),
  ];

  const quoteHeadings = ["Algorithm", "Matches"];
  const quotes = [
    "Users go through a vetting process to ensure you never match with bots.",
    "We match you with people that have a large array of similar interests.",
    "Our developers have prioritized your security and privacy at every step."
  ];

  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1950);
   
      const dotsInterval = setInterval(() => {
        setActiveDot((prevIndex) => (prevIndex + 1) % 3);
      }, 2000);

      return () => {
        clearInterval(interval);
        clearInterval(dotsInterval);
      };
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor:"white"}}>
      <StatusBar barStyle='dark'/>
      <View style={{ alignItems: "center" }}>
        <Image source={images[index]} style={styles.image} />
        <Text style={styles.quoteHeadings}>{quoteHeadings[activeDot % quoteHeadings.length]}</Text>
        <Text style={styles.quotes}>{quotes[activeDot % quotes.length]}</Text>

        {/* Dots */}
        <View style={styles.dotContainer}>
          <View style={[styles.dot, { backgroundColor: activeDot === 0 ? "#E94057" : "gray" }]} />
          <View style={[styles.dot, { backgroundColor: activeDot === 1 ? "#E94057" : "gray" }]} />
          <View style={[styles.dot, { backgroundColor: activeDot === 2 ? "#E94057" : "gray" }]} />
        </View>
      </View>

      <View style={{ height: 140 }}>
        <TouchableOpacity style={styles.createAccountButton} onPress={handleSignup}>
          <Text style={styles.buttonText}>Create an account</Text>
        </TouchableOpacity>
        <Text style={styles.alreadyHaveAccountText}>Already have an account?</Text>
        <TouchableOpacity onPress={handleLogin}> 
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "60%",
    height: "70%",
    borderRadius: 20,
    marginTop: 30,
  },

  quoteHeadings: {
    fontSize: 24,
    fontWeight: "700",
    position: "relative",
    top: 40,
    color: "#E94057",
  },

  quotes: {
    fontSize: 14,
    fontWeight: "500",
    position: "relative",
    top: 50,
    textAlign: "center",
    width: "80%",
  },

  dotContainer: {
    flexDirection: "row",
    position: "relative",
    top: 70,
  },

  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,  
    marginHorizontal: 5,
  },

  createAccountButton: {
    alignItems: "center",
    backgroundColor: "#E94057",
    width: "80%",
    alignSelf: "center",
    height: 60,
    justifyContent: "center",
    borderRadius: 8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },

  alreadyHaveAccountText: {
    fontSize: 14,
    fontWeight: "400",
    alignSelf: "center",
    position: "relative",
    top: 30,
    left: -20,
  },

  signInText: {
    fontSize: 14,
    fontWeight: "700",
    alignSelf: "center",
    position: "relative",
    top: 14,
    left: 83,
    color: "#E94057",
  },
});

export default StartScreen;
