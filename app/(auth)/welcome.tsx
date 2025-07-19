import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
    return (
        <SafeAreaView className="flex h-full items-center justify-between">
            <TouchableOpacity
                onPress={() => {
                    router.replace("/(auth)/sign-up")
                }}
                className="flex w-full justify-end items-end p-5"
            >
                <Text className="text-black text-md font-JakartaBold">Skip</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Welcome;