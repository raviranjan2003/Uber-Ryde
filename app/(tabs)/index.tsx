import { Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className='flex-1 items-center justify-center bg-white h-full'>
        <Text className='text-blue-500'>Hey There!</Text>
      </View>
    </SafeAreaView>
  );
}