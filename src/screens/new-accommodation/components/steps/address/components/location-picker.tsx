import React, { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { Button } from '../../../../../../shared/components/button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: { paddingHorizontal: 16, paddingTop: 16 },
});

export const LocationPicker = ({
  onConfirmLocation,
}: {
  onConfirmLocation: (coors: Pick<Region, 'latitude' | 'longitude'>) => void;
}): ReactElement => {
  const [initialRegion, setInitialRegion] = useState<Region>({
    latitude: -33.4727,
    latitudeDelta: 0,
    longitude: -70.6123,
    longitudeDelta: 0,
  });

  const [selectedLocation, setSelectedLocation] = useState<Region>(initialRegion);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          setInitialRegion({ ...initialRegion, latitude, longitude });
        } else {
          alert('Permission denied');
        }
      } catch (error) {
        alert(error);
      }
    };

    requestLocationPermission();
  });

  const handleRegionChange = (region: Region) => {
    setSelectedLocation(region);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion} onRegionChange={handleRegionChange}>
        <Marker coordinate={selectedLocation} draggable />
      </MapView>
      <View style={styles.button}>
        <Button onPress={(): void => onConfirmLocation(selectedLocation)}>Confirmar</Button>
      </View>
    </View>
  );
};
