import { icons } from "@/constants";
import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";

const OAuth = () => {
    const handleGoogleSignUp = async () => {

    }

    return (
        <View>
            <View className="flex flex-row justify-center items-center mt-1 gap-x-3">
                <View className="flex-1 h-[1px] bg-gray-400" />
                <Text className="text-lg">Or</Text>
                <View className="flex-1 h-[1px] bg-gray-400" />
            </View>
            <CustomButton
                title="SignIn with Google"
                className="mt-2 w-full shadow-none"
                IconLeft={() => (
                    <Image
                        source={icons.google}
                        resizeMode="contain"
                        className="w-5 h-5 mx-2"
                    />
                )}
                bgVariant="outline"
                textVariant="primary"
                onPress={handleGoogleSignUp}
            />
        </View>
    )
}

export default OAuth;