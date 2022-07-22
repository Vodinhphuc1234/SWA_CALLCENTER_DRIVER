import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAP_API } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react/cjs/react.development";
import { useRef } from "react/cjs/react.development";
import {
  selectDestination,
  selectOrigin,
  setDestination,
  setTravelTimeInfromation,
} from "../slices/navSlice";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";

const Map = ({ autocompleteInput }) => {
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

      const getTralvelInfo = async () => {
        fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.lat}%2C${origin.lng}&destinations=${destination.lat}%2C${destination.lng}&key=${GOOGLE_MAP_API}`
        )
          .then((res) => res.json())
          .then((data) => {
            const action = setTravelTimeInfromation({
              distance: data.rows[0].elements[0].distance.text,
              duration: data.rows[0].elements[0].duration.text,
            });
            dispatch(action);
          });
      };

      getTralvelInfo();
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
        // onUserLocationChange={(e) => {
        //   console.log(e.nativeEvent);
        // }}
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
          <MapViewDirections
            origin={{
              latitude: origin.lat,
              longitude: origin.lng,
            }}
            destination={{
              latitude: destination.lat,
              longitude: destination.lng,
            }}
            apikey={GOOGLE_MAP_API}
            strokeWidth={3}
            strokeColor="red"
          />
        )}
      </MapView>
    </>
  );
};

export default Map;

const styles = StyleSheet.create({});
