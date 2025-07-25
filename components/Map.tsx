import { icons } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { calculateDriverTimes, calculateRegion, generateMarkersFromData } from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store";
import { Driver, MarkerData } from "@/types/type";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirection from "react-native-maps-directions";



const Map = () => {
    const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");

    const { userLatitude, userLongitude, destinationLatitude, destinationLongitude } = useLocationStore();

    const { selectedDriver, setSelectedDriver, setDrivers } = useDriverStore();
    const [markers, setMarkers] = useState<MarkerData[]>([]);

    // const region = {
    //     latitude: userLatitude ?? 0,
    //     longitude: userLongitude ?? 0,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    // }
    const region = calculateRegion({
        userLatitude: userLatitude ?? 0,
        userLongitude: userLongitude ?? 0,
        destinationLatitude,
        destinationLongitude
    })

    useEffect(() => {
        if (Array.isArray(drivers)) {
            if (!userLatitude || !userLongitude) return;

            const newMarkers = generateMarkersFromData({
                data: drivers,
                userLatitude,
                userLongitude,
            });
            setMarkers(newMarkers);
        }
    }, [drivers, userLatitude, userLongitude]);

    useEffect(()=>{
        if(markers.length > 0 && destinationLatitude && destinationLongitude) {
            calculateDriverTimes({
                markers,
                userLatitude,
                userLongitude,
                destinationLatitude,
                destinationLongitude
            }).then(drivers => {
                setDrivers(drivers as MarkerData[]);
            })
        }
    },[markers, destinationLatitude, destinationLongitude]);

    if(loading || !userLatitude || !userLongitude) {
        return (
            <View className="flex justify-center items-center w-full">
                <ActivityIndicator size="small" color="#000" />
            </View>
        )
    }
    if(error) {
        return (
            <View className="flex justify-center items-center w-full">
                <Text>Error: {error}</Text>
            </View>
        )
    }

    return (
        <MapView 
            provider={PROVIDER_DEFAULT} 
            className="w-full h-full"
            showsUserLocation={true}
            userInterfaceStyle="light"
            initialRegion={region}
        >
            {
                markers.map(marker => (
                    <Marker 
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        }}
                        title={ marker.title }
                        image={ selectedDriver === marker.id ? icons.selectedMarker : icons.marker }
                    />
                ))
            }
            {destinationLatitude && destinationLongitude && (
                <>
                    <Marker 
                        key="destination"
                        coordinate={{
                            latitude: destinationLatitude,
                            longitude: destinationLongitude
                        }}
                        title="Destination"
                        image={icons.pin}
                    />
                    <MapViewDirection 
                        origin={{
                            latitude: userLatitude,
                            longitude: userLongitude
                        }}
                        destination={{
                            latitude: destinationLatitude,
                            longitude: destinationLongitude
                        }}
                        apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
                        strokeColor="#0286ff"
                        strokeWidth={3}
                    />
                </>
            )}
        </MapView>
    )
}

export default Map;