import { Button, Divider } from "@rneui/themed";
import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
  resetTrip,
  selectNotificationTrip,
  selectTripInformation,
  setNotificationTrip,
  setTripInformation,
} from "../slices/navSlice";
import convertTripInformation from "../Utils/adapter/convertTripInformation";
import UpdateTrip from "../Utils/trip/updateTrip";

const NotificationTripmodal = ({ origin, destination, timerRef }) => {
  const tripInfo = useSelector(selectTripInformation);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const notificationTrip = useSelector(selectNotificationTrip);
  return (
    <Modal
      isVisible={notificationTrip}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <View style={{ padding: 20, height: "100%", backgroundColor: "white" }}>
        <View
          style={tw`bg-gray-50 p-5 border-dotted border-2 border-gray-300 mb-10`}
        >
          <View style={tw``}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {origin.description}
            </Text>
            <Divider style={tw`my-5`} />

            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {destination.description}
            </Text>
            <Divider style={tw`my-5`} />
            <View style={tw`bg-yellow-500 py-2 px-5 rounded-full`}>
              <Text style={tw`text-white font-bold`}>
                Distance: {tripInfo.distance}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={tw`bg-gray-50 p-5 border-dotted border-2 border-gray-300 flex-row justify-between`}
        >
          <Text style={tw`text-gray-500`}>
            Money ({tripInfo.paymentMethod})
          </Text>
          <Text style={tw`font-bold`}>{tripInfo.price} VND</Text>
        </View>

        <View style={tw`flex-row w-full justify-center flex-grow items-end`}>
          <Button
            type="outline"
            buttonStyle={{
              borderColor: "red",
              borderWidth: 1,
              marginRight: 10,
            }}
            titleStyle={tw`text-red-500`}
            onPress={() => {
              dispatch(setNotificationTrip(false));
              clearTimeout(timerRef.current);
              dispatch(resetTrip());
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            buttonStyle={tw`bg-green-500`}
            containerStyle={tw`flex-grow`}
            onPress={async () => {
              setLoading(true);
              const data = await UpdateTrip(tripInfo.self, {
                status: "assigned",
              });
              setLoading(false);

              if (data?.data?.message) {
                Alert.alert("Error", data?.data?.message);
              } else {
                const trip = convertTripInformation(data);
                dispatch(setTripInformation({ ...trip.tripInformation }));
              }

              clearTimeout(timerRef.current);
              dispatch(setNotificationTrip(false));
            }}
          >
            {loading ? <ActivityIndicator /> : "Accept"}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationTripmodal;

const styles = StyleSheet.create({});
