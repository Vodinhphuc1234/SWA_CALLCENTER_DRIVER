import { View, Text } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import tw from "tailwind-react-native-classnames";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@rneui/themed";
import pushNotification from "../../Utils/pushNotification";
import { useNavigation } from "@react-navigation/native";
import { selectOrigin } from "../../slices/navSlice";
import { useSelector } from "react-redux";

const TripProcessingNav = () => {
  const origin = useSelector(selectOrigin);
  const navigator = useNavigation();
  return (
    <View>
      <View style={tw`mb-5 flex-row items-center flex-grow`}>
        <View style={tw`rounded-full bg-blue-800 p-1 mr-5`}>
          <FontAwesomeIcon icon={faPerson} size={25} color="white" />
        </View>
        <View style={{ width: 320 }}>
          <Text style={tw`text-lg font-bold`}>{origin.name}</Text>
          <Text style={tw`text-gray-500`}>{origin.description}</Text>
        </View>
      </View>
      <Button
        onPress={async () => {
          await pushNotification(
            "ExponentPushToken[Sv2M0_BfBvxRSjzYvtJ8jR]",
            "Notification from Call Center",
            "Your driver has just arrived"
          );
          navigator.navigate("TripArrivedNav");
        }}
      >
        I arrived
      </Button>
    </View>
  );
};

export default TripProcessingNav;
