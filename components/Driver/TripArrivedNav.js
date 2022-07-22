import { View, Text } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import tw from "tailwind-react-native-classnames";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import pushNotification from "../../Utils/pushNotification";
import { Button } from "@rneui/themed";
import {
  selectDestination,
  setDestination,
  setOrigin,
} from "../../slices/navSlice";
import { useDispatch, useSelector } from "react-redux";

const TripArrivedNav = () => {
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  return (
    <View>
      <View style={tw`mb-5 flex-row items-center flex-grow`}>
        <View style={tw`rounded-full bg-blue-800 p-1 mr-5`}>
          <FontAwesomeIcon icon={faPerson} size={25} color="white" />
        </View>
        <View style={{ width: 320 }}>
          <Text style={tw`text-lg font-bold`}>{destination.name}</Text>
          <Text style={tw`text-gray-500`}>{destination.description}</Text>
        </View>
      </View>
      <Button
        onPress={async () => {
          await pushNotification(
            "ExponentPushToken[Sv2M0_BfBvxRSjzYvtJ8jR]",
            "Notification from Call Center",
            "Your trip is compleled, rate 5 stars for driver if you feel like"
          );

          dispatch(setOrigin(null));
          dispatch(setDestination(null));
        }}
      >
        Complete
      </Button>
    </View>
  );
};

export default TripArrivedNav;
