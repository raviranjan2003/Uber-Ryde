import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSignUp = async () => {

    }

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[200px]">
                    <Image source={images.signUpCar} className="z-0 w-full h-[200px]"/>
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-4">
                        Create Your Account
                    </Text>
                </View>
                <View className="p-5">
                    <InputField 
                        label="Name"
                        placeholder="Enter Your Name"
                        icon={icons.person}
                        value={form.name}
                        onChange={(value) => setForm({...form, name: value.nativeEvent.text})}
                    />
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
                        title="Sign Up"
                        className="mt-6"
                        onPress={handleSignUp}
                    />

                    {/* OAuth */}
                    <OAuth />

                    <Link href="/sign-in" className="text-xs text-center text-general-200 mt-3">
                        <Text>Already have an account?</Text>
                        <Text className="text-blue-600">Log In</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    )
}

export default SignUp;