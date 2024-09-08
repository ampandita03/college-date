import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Friend = () => {
    const navigation = useNavigation();

    const handleSkip = () => {
        navigation.navigate('Notification');
    };
    const accessContacts=()=>{
      navigation.navigate('Contacts');
    }

    return (
        <SafeAreaView className="flex-1">
            <View className="h-20 justify-center items-end">
                <TouchableOpacity onPress={handleSkip}>
                    <Text className="text-app-color font-bold text-base mr-4">Skip</Text>
                </TouchableOpacity>
            </View>

            <View className="h-3/6 justify-center items-center">
                <Image source={require('../assets/images/Friend.png')} />
            </View>
            <View className="h-40 items-center">
                <Text className="text-3xl font-bold text-center"> 
                    Search friend’s
                </Text>
                <Text className="text-base text-center mt-2 w-72">
                    You can find friends from your contact lists to connect
                </Text>
            </View>

            <TouchableOpacity className="bg-app-color h-14 w-80 self-center justify-center rounded-lg" onPress={accessContacts}>
                <Text className="text-lg text-white self-center font-medium">
                    Access to a contact list
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

export default Friend;
