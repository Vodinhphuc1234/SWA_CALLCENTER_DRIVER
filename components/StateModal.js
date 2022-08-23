import { faAdd, faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { Divider, Switch } from "@rneui/themed";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { setCurrentVehicle } from "../slices/navSlice";
import updateVehicle from "../Utils/trip/updateVehicle";

const StateModal = ({
  isVisibleModal,
  toggleAutoGetTrip,
  autoGetTrip,
  setIsVisibleModal,
  currentVehicle,
  vehicles,
}) => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
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
          paddingHorizontal: 20,
          width: 300,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingVertical: 10,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faMapPin}
            color={`${currentVehicle ? "green" : "red"}`}
          />

          {currentVehicle ? (
            <>
              <Text style={tw`text-lg font-medium ml-5`}>
                {(currentVehicle.name ? currentVehicle.name : "Default") +
                  " (" +
                  currentVehicle.car_type +
                  ")"}
              </Text>

              <Button
                color="red"
                style={{ marginLeft: 5 }}
                onPress={async () => {
                  if (currentVehicle) {
                    const turnOffData = await updateVehicle(
                      currentVehicle.self,
                      {
                        is_active: false,
                      }
                    );
                    if (turnOffData.message) {
                      Alert.alert("Erro", turnOffData.message);
                    } else {
                      const action = setCurrentVehicle(undefined);
                      dispatch(action);
                    }
                  }
                }}
              >
                <Text style={{ color: "white" }}>Disable</Text>
              </Button>
            </>
          ) : (
            <Text style={tw`text-lg font-medium ml-5`}>UnActive</Text>
          )}
        </View>
        <Divider />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ marginVertical: 10, textAlign: "center", fontSize: 15 }}
          >
            Auto get Trip
          </Text>
          <Switch
            value={autoGetTrip}
            onValueChange={(value) => {
              toggleAutoGetTrip();
            }}
          />
        </View>
        <Divider />

        {vehicles.length === 0 && (
          <View>
            <Text
              style={{ marginVertical: 10, textAlign: "center", color: "gray" }}
            >
              No vehicle avialable
            </Text>
          </View>
        )}

        {vehicles.map((item, i) => (
          <View
            key={i}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Text style={{ color: "gray", fontSize: 14, fontWeight: "600" }}>
              {(item.name ? item.name : "Default") + " (" + item.car_type + ")"}
            </Text>
            <Button
              color="green"
              onPress={async () => {
                // switch vehicle
                // turn off current
                if (currentVehicle) {
                  const turnOffData = await updateVehicle(currentVehicle.self, {
                    is_active: false,
                  });
                  if (turnOffData.message) {
                    Alert.alert("Erro", turnOffData.message);
                    return;
                  }
                }

                //turn on
                const turnOnData = await updateVehicle(item.self, {
                  is_active: true,
                });

                if (turnOnData.message) {
                  Alert.alert("Erro", turnOnData.message);
                } else {
                  const action = setCurrentVehicle(turnOnData);
                  dispatch(action);
                }
              }}
            >
              <Text style={{ color: "white" }}>Actice</Text>
            </Button>
          </View>
        ))}
        <Divider />
        <View>
          <TouchableOpacity
            style={tw`flex-row items-center justify-evenly py-3`}
            onPress={() => {
              setIsVisibleModal(false);
              navigator.navigate("AddVehicleScreen");
            }}
          >
            <FontAwesomeIcon icon={faAdd} color="green" />
            <Text style={tw`text-center text-lg font-bold text-green-400`}>
              Add vehicle
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default StateModal;
