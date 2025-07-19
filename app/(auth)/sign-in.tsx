import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleSignIn = async () => {

    }

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[200px]">
                    <Image source={images.signUpCar} className="z-0 w-full h-[200px]"/>
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-4">
                        Welcome👋
                    </Text>
                </View>
                <View className="p-5">
                    <InputField 
                        label="Email"
                        placeholder="Enter Your Email"
                        icon={icons.email}
                        value={form.email}
                        onChange={(value) => setForm({...form, email: value.nativeEvent.text})}
                    />
                    <InputField 
                        label="Password"
                        placeholder="Enter Your Password"
                        icon={icons.lock}
                        value={form.password}
                        secureTextEntry={true}
                        onChange={(value) => setForm({...form, password: value.nativeEvent.text})}
                    />

                    <CustomButton
                        title="Sign In"
                        className="mt-6"
                        onPress={handleSignIn}
                    />

                    {/* OAuth */}
                    <OAuth />

                    <Link href="/sign-up" className="text-xs text-center text-general-200 mt-3">
                        <Text>Don't have an account?</Text>
                        <Text className="text-blue-600">Sign Up</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    )
}

export default SignIn;