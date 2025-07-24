import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";
import { Image, View } from "react-native";
import 'react-native-get-random-values';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
    icon,
    initialLocation,
    containerStyle,
    textInputBackgroundColor,
    handlePress
}: GoogleInputProps) => {

    // const testApiKey = async () => {
    //     try {
    //       const response = await fetch(
    //         `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=pizza&key=${googlePlacesApiKey}`
    //       );
    //       const data = await response.json();
    //       console.log("API Test Result:", data);
    //     } catch (error) {
    //       console.log("API Test Error:", error);
    //     }
    //   };
      
    //   // Call this in useEffect
    //   useEffect(() => {
    //     testApiKey();
    //   }, []);
    return (
      <View
        className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
      >
        <GooglePlacesAutocomplete
            placeholder="Where to?"
            fetchDetails={true}
            debounce={200}
            enablePoweredByContainer={true}
            nearbyPlacesAPI="GooglePlacesSearch"
            minLength={2}
            timeout={10000}
            keyboardShouldPersistTaps="handled"
            listViewDisplayed="auto"
            keepResultsAfterBlur={false}
            currentLocation={false}
            currentLocationLabel="Current location"
            enableHighAccuracyLocation={true}
            onFail={() => console.warn('Google Places Autocomplete failed')}
            onNotFound={() => console.log('No results found')}
            onTimeout={() => console.warn('Google Places request timeout')}
            predefinedPlaces={[]}
            predefinedPlacesAlwaysVisible={false}

            styles={{
                textInputContainer: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    marginHorizontal: 20,
                    position: 'relative',
                    shadowColor: '#d4d4d4',
                },
                textInput: {
                    backgroundColor: textInputBackgroundColor || 'white',
                    fontWeight: '600',
                    fontSize: 16,
                    marginTop: 5,
                    width: '100%',
                    fontFamily: 'JakartaSans-Medium',
                    color: '#000',
                },
                listView: {
                    backgroundColor: textInputBackgroundColor || 'white',
                    position: 'relative',
                    top: 0,
                    width: '100%',
                    zIndex: 99,
                    borderRadius: 10,
                    shadowColor: '#d4d4d4',
                },
            }}

            query={{
                key: googlePlacesApiKey,
                language: 'en',
                types: 'geocode',
            }}

            onPress={(data, details = null) => {

                if (!details?.geometry?.location) {
                    console.warn('Missing geometry details!');
                    return;
                }

                handlePress({
                    latitude: details?.geometry.location.lat,
                    longitude: details?.geometry.location.lng,
                    address: data?.description,
                });
            }}
            GooglePlacesSearchQuery={{
                rankby: 'distance',
                radius: 1000, // <-- REQUIRED if using 'distance'
            }}

            renderLeftButton={() => (
                <View className="justify-center items-center w-6 h-6">
                    <Image source={icon || icons.search} className="w-6 h-6" resizeMode="contain" />
                </View>
            )}

            textInputProps={{
                placeholderTextColor: 'gray',
                placeholder: initialLocation ?? 'Where do you want to go?',
            }}
        />
      </View>
    );
  };

export default GoogleTextInput;