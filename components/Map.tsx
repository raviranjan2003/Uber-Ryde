import { Text } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => (
    <MapView 
        provider={PROVIDER_DEFAULT} 
        className="w-full h-full"
        tintColor="black"
    >
        <Text>Map</Text>
    </MapView>
)

export default Map;