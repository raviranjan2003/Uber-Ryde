import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: ""
    })

    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return

        // Start sign-up process using email and password provided
        try {
            await signUp.create({
                emailAddress: form.email.trim(),
                password: form.password,
            })

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
            setVerification({ ...verification, state: "pending"})
        } catch (err: any) {
            Alert.alert("Error", err.errors[0].longMessage)
            console.error(JSON.stringify(err, null, 2))
        }
    }

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            })

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId })
                setVerification({ ...verification, state: "success"})
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signUpAttempt, null, 2));
                setVerification({ ...verification, error: "Verification Failed!", state: "failed"});
            }
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            setVerification({ ...verification, error: err.errors[0].longMessage, state: "failed"});
            console.error(JSON.stringify(err, null, 2))
            Alert.alert("Error", err.errors[0].longMessage);
        }
    }

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[200px]">
                    <Image source={images.signUpCar} className="z-0 w-full h-[200px]" />
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
                        onChange={(value) => setForm({ ...form, name: value.nativeEvent.text })}
                    />
                    <InputField
                        label="Email"
                        placeholder="Enter Your Email"
                        icon={icons.email}
                        value={form.email}
                        onChange={(value) => setForm({ ...form, email: value.nativeEvent.text })}
                    />
                    <InputField
                        label="Password"
                        placeholder="Enter Your Password"
                        icon={icons.lock}
                        value={form.password}
                        secureTextEntry={true}
                        onChange={(value) => setForm({ ...form, password: value.nativeEvent.text })}
                    />

                    <CustomButton
                        title="Sign Up"
                        className="mt-6"
                        onPress={onSignUpPress}
                    />

                    {/* OAuth */}
                    <OAuth />

                    <Link href="/sign-in" className="text-xs text-center text-general-200 mt-3">
                        <Text>Already have an account?</Text>
                        <Text className="text-blue-600">Log In</Text>
                    </Link>
                </View>
                <ReactNativeModal 
                    isVisible={verification.state === "pending"}
                    onModalHide={() => {
                        if(verification.state === "success") setShowSuccessModal(true)
                    }}
                >
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Text className="text-xl font-JakartaExtraBold mb-2">
                            Verification
                        </Text>
                        <Text className="text-xs text-gray-500 font-Jakarta mb-5">
                            We've sent a verification code to {form.email}
                        </Text>
                        <InputField
                            label="code"
                            icon={icons.lock}
                            placeholder="123456"
                            value={verification.code}
                            keyboardType="numeric"
                            onChangeText={(code) => setVerification({ ...verification, code })}
                        />
                        {verification.error && (
                            <Text className="text-red-500 text-sm mt-1">
                                {verification.error}
                            </Text>
                        )}
                        <CustomButton 
                            title="Verify Email"
                            onPress={onVerifyPress}
                            className="mt-5 bg-success-500"
                        />
                    </View>
                </ReactNativeModal>
                <ReactNativeModal isVisible={showSuccessModal}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5"/>
                        <Text className="text-2xl font-JakartaBold text-center">
                            Verified
                        </Text>
                        <Text className="text-xs text-center text-gray-400 font-Jakarta">
                            You have successfully verified your account.
                        </Text>
                        <CustomButton
                            title="Browse Home"
                            onPress={() => {
                                setShowSuccessModal(false);
                                router.push("/(root)/(tabs)/home")
                            }}
                            className="mt-4"
                        />
                    </View>
                </ReactNativeModal>
            </View>
        </ScrollView>
    )
}

export default SignUp;