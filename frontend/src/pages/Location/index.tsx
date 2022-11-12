import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { api } from '../../services/api';
import * as Location from 'expo-location';

import MapView, { Marker } from 'react-native-maps';

interface InstitutionRequest {
  institution: Institution;
  distance: number;
}

interface Institution {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  photo: string;
  latitude: string;
  longitude: string;
  address: {
    id: string;
    logradouro: string;
    street: string;
    cep: string;
    complement?: null;
    district: string;
    city: string;
    uf: string;
    createdAt: string;
    updatedAt: string;
  }
}

interface CoordinateProps {
  coords: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  },
  mocked?: boolean,
  timestamp: number,
}

const customMapStyle = [
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#444444"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "color": "#f2f2f2"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {
        "saturation": -100
      },
      {
        "lightness": 45
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "color": "#46bcec"
      },
      {
        "visibility": "on"
      }
    ]
  }
]

export default function Locale() {

  const [institutionData, setInstitutionData] = useState<InstitutionRequest[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject>({} as Location.LocationObject);
  const [currentHemoCenter, setCurrentHemoCenter] = useState<InstitutionRequest>({} as InstitutionRequest);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await api.get('/list-institutions', {
            params: {
              latitude: currentLocation?.coords?.latitude,
              longitude: currentLocation?.coords?.longitude,
            }
          });
          setInstitutionData(response.data);
          setCurrentHemoCenter(response.data[0]);
        }
        catch (error) {
          console.log(error);
        }
      })();
    }, [currentLocation])
  );

  useFocusEffect(
    useCallback(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão de localização negada');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});

        if (!location) return;

        setCurrentLocation(location);
        //await AsyncStorage.setItem('@latitude', String(location?.coords?.latitude));
        //await AsyncStorage.setItem('@longitude', String(location?.coords?.longitude));
      })();
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        {currentLocation?.coords && (
          <MapView
            initialRegion={{
              latitude: currentLocation?.coords.latitude,
              longitude: currentLocation?.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: currentLocation?.coords.latitude,
              longitude: currentLocation?.coords.longitude,
              latitudeDelta: 0.020,
              longitudeDelta: 0.001,
            }}
            provider={'google'}
            showsUserLocation={true}
            style={{ height: '100%', width: '100%' }}
            customMapStyle={customMapStyle}
          >
            {institutionData?.map((institution, index) => (
              <Marker
                key={index}
                onPress={() => setCurrentHemoCenter(institution)}
                coordinate={{
                  latitude: Number(institution.institution.latitude),
                  longitude: Number(institution.institution.longitude),
                  // latitudeDelta: 0.1201, 
                  // longitudeDelta: 0.0221, 
                }}
                style={{ marginBottom: -50, }}
              />
            ))}
          </MapView>
        )}
      </View>
      <View style={styles.content}>
        <View>
          <Image source={{ uri: currentHemoCenter?.institution?.photo }} style={styles.image} />
        </View>
        <View>
          <Text>Nome: {currentHemoCenter?.institution?.name}</Text>
          <Text>Rua: {currentHemoCenter?.institution?.address.street}</Text>
          <Text>Cidade: {currentHemoCenter?.institution?.address.city}</Text>
          <Text>Distância: {currentHemoCenter?.distance}</Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    height: 150,
    flexDirection: 'row',
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
  }
})