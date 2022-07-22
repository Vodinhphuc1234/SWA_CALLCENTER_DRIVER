import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMapPin, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-native-modal";
import { Divider, Switch } from "@rneui/themed";
import tw from "tailwind-react-native-classnames";

const StateModal = ({
  isVisibleModal,
  toggleAutoGetTrip,
  toggleActive,
  active,
  autoGetTrip,
  setIsVisibleModal,
}) => {
  return (
    <Modal
      isVisible={isVisibleModal}
      style={{
        position: "absolute",
        top: 80,
        right: 10,
        borderRadius: 10,
      }}
      onBackdropPress={() => {
        setIsVisibleModal(!isVisibleModal);
      }}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <View
        style={{
          minWidth: 200,
          backgroundColor: "white",
          borderRadius: 10,
          padding: 5,
          paddingHorizontal: 10,
        }}
      >
        <View style={tw`flex-row py-3 items-center`}>
          <FontAwesomeIcon
            icon={faMapPin}
            color={`${active ? "green" : "red"}`}
          />
          <Text style={tw`text-lg font-medium ml-5`}>
            {active ? "Active" : "UnActive"}
          </Text>
        </View>
        <Divider />
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-lg font-medium mr-10`}>Auto get Trip</Text>
          <Switch
            value={autoGetTrip}
            onValueChange={(value) => {
              toggleAutoGetTrip();
            }}
          />
        </View>
        <Divider />
        <View>
          {active ? (
            <TouchableOpacity
              style={tw`flex-row items-center justify-evenly py-3`}
              onPress={() => {
                toggleActive();
              }}
            >
              <FontAwesomeIcon icon={faPowerOff} color="red" />
              <Text style={tw`text-center text-lg font-bold text-red-400`}>
                Power OFF
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={tw`flex-row items-center justify-evenly py-3`}
              onPress={() => {
                toggleActive();
              }}
            >
              <FontAwesomeIcon icon={faPowerOff} color="green" />
              <Text style={tw`text-center text-lg font-bold text-green-400`}>
                Power ON
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default StateModal;
