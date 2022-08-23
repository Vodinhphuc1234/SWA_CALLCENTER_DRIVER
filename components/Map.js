import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
  selectDestination,
  selectOrigin,
  setTripInformation,
} from "../slices/navSlice";
import getDistanceAndDuration from "../Utils/getDistanceAndDuration";
import getGeometies from "../Utils/getGeometries";
import getCurrentLocation from "../Utils/getCurrentLocation";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

const Map = () => {
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [geometries, setGeometries] = useState([]);
  let origin = useSelector(selectOrigin);
  let destination = useSelector(selectDestination);
  const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

  const dispatch = useDispatch();

  useEffect(() => {
    if (origin && destination) {
      mapRef.current.fitToCoordinates(
        [
          { latitude: origin.lat, longitude: origin.lng },
          { latitude: destination.lat, longitude: destination.lng },
        ],
        {
          edgePadding: DEFAULT_PADDING,
          animated: true,
        }
      );

      const asyncFunc = async () => {
        let coordinates = await getGeometies(origin, destination);
        setGeometries([...coordinates]);
      };

      asyncFunc();
    }
  }, [origin, destination]);

  const mapRef = useRef();
  return (
    <>
      <MapView
        style={tw`h-full`}
        initialRegion={{
          latitude: 10.08,
          longitude: 106.08,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
          zoom: 3,
        }}
        ref={mapRef}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
        {origin && (
          <Marker
            name={"origin"}
            coordinate={{ latitude: origin.lat, longitude: origin.lng }}
            description={origin.description}
          >
            <FontAwesomeIcon icon={faCar} color="blue" />
          </Marker>
        )}

        {destination && (
          <Marker
            name={"destination"}
            coordinate={{
              latitude: destination.lat,
              longitude: destination.lng,
            }}
            description={destination.description}
          ></Marker>
        )}

        {origin && destination && (
          <Polyline
            coordinates={[...geometries]}
            strokeWidth={3}
            strokeColor="red"
          />
        )}
      </MapView>
      <TouchableOpacity
        style={tw`absolute p-2 bg-white rounded-full opacity-90 right-5 bottom-20`}
        onPress={async () => {
          setLoadingLocation(true);
          let currentPosition = await getCurrentLocation();

          mapRef.current.animateToRegion({
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
          setLoadingLocation(false);
        }}
      >
        {loadingLocation ? (
          <ActivityIndicator />
        ) : (
          <FontAwesomeIcon icon={faLocationCrosshairs} size={25} color="gray" />
        )}
      </TouchableOpacity>
    </>
  );
};

export default Map;

const styles = StyleSheet.create({});
