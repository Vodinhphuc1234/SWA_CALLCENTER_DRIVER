import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Button } from "@rneui/themed";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
  reset,
  selectDestination,
  selectOrigin,
  selectTripInformation,
  setTripInformation,
} from "../../slices/navSlice";
import convertTripInformation from "../../Utils/adapter/convertTripInformation";
import UpdateTrip from "../../Utils/trip/updateTrip";

const TripProcessingNav = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const tripInfo = useSelector(selectTripInformation);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "blue",
            padding: 5,
            marginRight: 20,
            borderRadius: 50,
          }}
        >
          <FontAwesomeIcon icon={faPerson} size={25} color="white" />
        </View>
        <View style={{ width: 320 }}>
          <Text style={tw`text-gray-500`}>{origin.description}</Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "yellow",
            padding: 5,
            marginRight: 20,
            borderRadius: 50,
          }}
        >
          <FontAwesomeIcon icon={faPerson} size={25} color="white" />
        </View>
        <View style={{ width: 320 }}>
          <Text style={tw`text-gray-500`}>{destination.description}</Text>
        </View>
      </View>
      <Button
        onPress={async () => {
          setLoading(true);
          const data = await UpdateTrip(tripInfo.self, { status: "pick_up" });
          setLoading(false);
          if (data?.status === 403) {
            Alert.alert("Error", data?.data?.message);
            dispatch(reset());
          } else {
            const trip = convertTripInformation(data);
            dispatch(
              setTripInformation({
                ...trip.tripInformation,
              })
            );
          }
        }}
      >
        {loading ? <ActivityIndicator /> : "Pick up"}
      </Button>
    </View>
  );
};

export default TripProcessingNav;
