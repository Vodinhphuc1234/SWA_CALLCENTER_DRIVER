import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import Modal from "react-native-modal";
import { Button, Divider } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";

const NotificationTripmodal = ({
  isVisible,
  setIsVisible,
  origin,
  destination,
  timerRef,
}) => {
  const dispatch = useDispatch();
  return (
    <Modal
      isVisible={isVisible}
      style={tw`h-5/6`}
      onBackdropPress={() => {
        setIsVisible(false);
      }}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <View style={tw`p-8 h-full bg-white`}>
        <View
          style={tw`bg-gray-50 p-5 border-dotted border-2 border-gray-300 mb-10`}
        >
          <View style={tw``}>
            <Text style={tw`text-lg font-bold`}>{origin.name}</Text>
            <Text style={tw`text-gray-500`}>{origin.description}</Text>
            <Divider style={tw`my-5`} />

            <Text style={tw`text-lg font-bold`}>{destination.name}</Text>
            <Text style={tw`text-gray-500`}>{destination.description}</Text>
            <Divider style={tw`my-5`} />
            <View style={tw`bg-yellow-500 p-2 rounded-full`}>
              <Text style={tw`text-white font-bold`}>Distance: 100km</Text>
            </View>
          </View>
        </View>
        <View
          style={tw`bg-gray-50 p-5 border-dotted border-2 border-gray-300 flex-row justify-between`}
        >
          <Text style={tw`text-gray-500`}>Money (Cash)</Text>
          <Text style={tw`font-bold`}>50,000 VND</Text>
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
              setIsVisible(false);
              clearTimeout(timerRef.current);
            }}
          >
            Cancel
          </Button>
          <Button
            buttonStyle={tw`bg-green-500`}
            containerStyle={tw`flex-grow`}
            onPress={() => {
              dispatch(setOrigin({ ...origin }));
              dispatch(setDestination({ ...destination }));
              clearTimeout(timerRef.current);
              setIsVisible(false);
            }}
          >
            Accept
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationTripmodal;

const styles = StyleSheet.create({});
