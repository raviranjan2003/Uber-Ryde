import { icons } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from 'expo-auth-session';
import { useCallback } from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";

const OAuth = () => {
    const { startSSOFlow } = useSSO()
    const handleGoogleSignUp = useCallback(async () => {
        console.log("Google Signup");
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri({
            scheme: "ubercrn",
            path: "/(root)/(tabs)/home"
        }),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        if(setActive) {
            await setActive!({ session: createdSessionId });

            if(signUp && signUp.status === 'complete') {
                // console.log("SignUp data==>",signUp);
                if(signUp?.createdUserId) {
                    await fetchAPI("/(api)/user", {
                        method: "POST",
                        body: JSON.stringify({
                            name: `${signUp.firstName} ${signUp.lastName}`,
                            email: signUp.emailAddress,
                            clerkId: signUp.createdUserId
                        })
                    })
                }
            }else if(signIn) {
                // console.log("SignIn data ==>", signIn);
                // Alert.alert("Signedin Successfully, redirecting to homepage...");
            }
        }
      } 
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

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