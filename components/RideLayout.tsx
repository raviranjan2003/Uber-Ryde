import { icons } from "@/constants";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Map from "./Map";

const RideLayout = ({ title, children }: { title: string, children : React.ReactNode}) => {
    const router = useRouter();
    const bottomSheetRef = useRef<BottomSheet>(null);

    return (
        <GestureHandlerRootView>
            <View className="flex-1 bg-white">
                <View className="flex flex-col h-screen bg-blue-500">
                    <View className="flex flex-row absolute z-10 top-16">
                        <TouchableOpacity onPress={() => router.back()}>
                            <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                                <Image 
                                    source={icons.backArrow}
                                    resizeMode="contain"
                                    className="w-6 h-6"
                                />
                            </View>
                        </TouchableOpacity>
                        <Text className="text-2xl font-JakartaSemiBold ml-5">{title || "Go Back"}</Text>
                    </View>
                    <Map />
                </View>
                <BottomSheet ref={bottomSheetRef} snapPoints={['40%', '85%']}>
                    <BottomSheetView style={{ flex: 1, padding: 20 }}>
                        { children }
                    </BottomSheetView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    )
}

export default RideLayout;