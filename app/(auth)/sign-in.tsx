import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useClerk, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    // Handle the submission of the sign-in form
    const onSignInPress = useCallback(async () => {
        if (!isLoaded) return;

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: form.email.trim(),
                password: form.password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }, [isLoaded, form.email, form.password])
    const { signOut } = useClerk();
    const handleSignOut = async () => {
        try {
          await signOut()
          console.log("Logged Out");
          // Redirect to your desired page
          router.replace('/')
        } catch (err) {
          // See https://clerk.com/docs/custom-flows/error-handling
          // for more info on error handling
          console.error(JSON.stringify(err, null, 2))
        }
      }
    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[200px]">
                    <Image source={images.signUpCar} className="z-0 w-full h-[200px]" />
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
                        title="Sign In"
                        className="mt-6"
                        onPress={onSignInPress}
                        // onPress={handleSignOut}
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