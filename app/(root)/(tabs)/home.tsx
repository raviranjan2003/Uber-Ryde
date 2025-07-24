// import GoogleTextInput from '@/components/GoogleTextInput';
import GoogleTextInput from '@/components/GoogleTextInput';
import Map from '@/components/Map';
import RideCard from '@/components/RideCard';
import { icons, images } from '@/constants';
import { useFetch } from '@/lib/fetch';
import { useLocationStore } from '@/store';
import { useClerk, useUser } from '@clerk/clerk-expo';
import * as Location from "expo-location";
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useClerk();

  const { setDestinationLocation, setUserLocation } = useLocationStore();
  const [hasPermissions, setHasPermissions] = useState(false);

  const { data: recentRides, loading } = useFetch(`/(api)/ride/${user?.id}`)

  const onSignOutPress = async () => {
      try {
        await signOut();

        router.replace('/(auth)/sign-in');
      } catch (err) {
        console.error(JSON.stringify(err, null, 2))
      }
  }

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) =>{
    setDestinationLocation(location);

    router.push('/(root)/find-ride');
  }

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      // console.log("Status===>",status);

      if(status !== 'granted') {
        setHasPermissions(false);
        return;
      }
      
      let location = await Location.getCurrentPositionAsync();
      
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!
      })

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name}, ${address[0].region}`
      })
    }

    requestLocation();
  }, [])

  return (
    <SafeAreaView className='bg-general-500'>
      <FlatList 
        data={recentRides?.slice(0, 5)}
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
          <>
            <View className='flex flex-row items-center justify-between my-5'>
              <Text className='text-2xl font-JakartaExtraBold'>Welcome {} 👋</Text>
              <TouchableOpacity
                onPress={onSignOutPress}
                className='items-center justify-center w-10 h-10 rounded-full bg-white'
              >
                <Image 
                  source={icons.out}
                />
              </TouchableOpacity>
            </View>
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />
            <>
              <Text className='text-xl font-JakartaBold mt-3 mb-5'>
                Your Current Location
              </Text>
              <View className='flex flex-row items-center bg-transparent h-[300px]'>
                <Map />
              </View>
            </>
              <Text className='text-xl font-JakartaBold mt-5 mb-3'>
                Recent Rides
              </Text>
          </>
        )}
      />
    </SafeAreaView>
  )
}