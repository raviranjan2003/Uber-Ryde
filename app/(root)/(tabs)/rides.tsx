import RideCard from "@/components/RideCard";
import { images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Rides = () => {
    const { user } = useUser();
    const { data: recentRides, loading } = useFetch(`/(api)/ride/${user?.id}`)
    return (
        <SafeAreaView>
            <FlatList
                    data={recentRides}
                    // data={[]}
                    renderItem={({ item }) => <RideCard ride={item}/>}
                    className='px-5'
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                      paddingBottom: 100
                    }}
                    ListEmptyComponent={() => (
                      <View className='flex flex-col items-center justify-center'>
                          {!loading ? (
                            <>
                              <Image
                                source={images.noResult}
                                className='w-40 h-40'
                                alt='No recent rides'
                                resizeMode='contain'
                              />
                              <Text className='text-sm'>No Recent Rides Found</Text>
                            </>
                          ): (
                            <ActivityIndicator size="small" color="#000"/>
                          )}
                      </View>
                    )}
                    ListHeaderComponent={() => (
                      <Text className="text-2xl font-JakartaBold my-5">Rides</Text>
                    )}
                  />
        </SafeAreaView>
    )
}

export default Rides;