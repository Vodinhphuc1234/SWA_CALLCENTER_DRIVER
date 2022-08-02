import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import {
  selectDestination,
  selectDriverState,
  selectOrigin,
  setDriverState,
  setUser,
} from "../slices/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPerson,
  faPowerOff,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import Map from "../components/Map";
import { useState } from "react";
import StateModal from "../components/StateModal";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TripProcessingNav from "../components/Driver/TripProcessingNav";
import TripArrivedNav from "../components/Driver/TripArrivedNav";

const HomeScreen = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const [invisibleModal, setInvisibleModal] = useState(false);

  const driverState = useSelector(selectDriverState);
  const { autoGetTrip, active } = driverState || {
    autoGetTrip: false,
    active: false,
  };
  const toggleAutoGetTrip = () => {
    dispatch(
      setDriverState({
        autoGetTrip: !autoGetTrip,
      })
    );
  };
  const toggleActive = () => {
    dispatch(
      setDriverState({
        active: !active,
      })
    );
  };
  let origin = useSelector(selectOrigin);
  let destination = useSelector(selectDestination);

  const Stack = createNativeStackNavigator();
  return (
    <>
      <SafeAreaView>
        <View
          style={[
            tw`relative h-full ${
              origin && destination && "h-3/4"
            } bg-white mt-7`,
          ]}
        >
          <Map />
          <TouchableOpacity
            style={tw`absolute bottom-20 right-5 bg-gray-500 h-10 w-10 rounded-full flex items-center justify-center`}
            onPress={async () => {
              await AsyncStorage.removeItem("USER_TOKEN");
              dispatch(setUser(null));
            }}
          >
            <FontAwesomeIcon icon={faSignOut} color="white" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`absolute top-14 right-3 bg-gray-500 h-10 w-10 rounded-full flex items-center justify-center`}
            onPress={() => {
              setInvisibleModal(!invisibleModal);
            }}
          >
            <FontAwesomeIcon icon={faPowerOff} color="white" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`absolute top-10 left-5 bg-red-100 h-10 w-10 rounded-full flex items-center justify-center`}
            onPress={() => {
              navigator.navigate("ProfileScreen");
            }}
          >
            <Avatar
              size={35}
              rounded
              source={{
                uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
              }}
            />
          </TouchableOpacity>
        </View>
        {origin && destination && (
          <View style={tw`h-1/4 z-50 p-5`}>
            <Stack.Navigator>
              <Stack.Screen
                name="TripProcessingNav"
                component={TripProcessingNav}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="TripArrivedNav"
                component={TripArrivedNav}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </View>
        )}
      </SafeAreaView>
      <StateModal
        setIsVisibleModal={setInvisibleModal}
        isVisibleModal={invisibleModal}
        toggleAutoGetTrip={toggleAutoGetTrip}
        toggleActive={toggleActive}
        autoGetTrip={autoGetTrip}
        active={active}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
