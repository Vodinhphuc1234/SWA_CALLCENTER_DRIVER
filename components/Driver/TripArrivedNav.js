import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Button } from "@rneui/themed";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
  resetTrip,
  selectDestination,
  selectOrigin,
  selectTripInformation,
} from "../../slices/navSlice";
import convertTripInformation from "../../Utils/adapter/convertTripInformation";
import UpdateTrip from "../../Utils/trip/updateTrip";

const TripArriveNav = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const tripInfo = useSelector(selectTripInformation);
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
        disabled={loading}
        onPress={async () => {
          setLoading(true);
          const data = await UpdateTrip(tripInfo.self, { status: "complete" });
          setLoading(false);
          if (data?.status === 403) {
            Alert.alert("Error", data?.data?.message);
            dispatch(reset());
          } else {
            Alert.alert("Error", "Your trip is completed !!!");
            dispatch(resetTrip());
          }
        }}
      >
        {loading ? <ActivityIndicator /> : "Complete"}
      </Button>
    </View>
  );
};

export default TripArriveNav;
