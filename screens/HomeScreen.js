import {
  faPowerOff,
  faSignOut,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Avatar } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import ChatComponent from "../components/ChatComponent";
import TripArrivedNav from "../components/Driver/TripArrivedNav";
import TripProcessingNav from "../components/Driver/TripProcessingNav";
import Map from "../components/Map";
import StateModal from "../components/StateModal";
import {
  selectDestination,
  selectDriverState,
  selectMessages,
  selectOrigin,
  selectSocket,
  setDriverState,
  setMessages,
  setUser,
} from "../slices/navSlice";

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

  //message modal
  const [messageModalVisible, setMessageModalVisible] = useState(false);

  return (
    <>
      <SafeAreaView>
        <View
          style={[
            tw`relative ${origin && destination && "h-3/4"} bg-white mt-7`,
          ]}
        >
          <Map />
          <TouchableOpacity
            style={{ position: "absolute", bottom: 30, left: 10 }}
            onPress={() => {
              setMessageModalVisible(true);
            }}
          >
            <Avatar
              size={50}
              rounded
              containerStyle={{
                backgroundColor: "blue",
              }}
              icon={{ name: "send", type: "font-awesome" }}
            />
          </TouchableOpacity>
          <Modal
            isVisible={messageModalVisible}
            swipeDirection="up"
            onSwipeComplete={() => setMessageModalVisible(false)}
            animationIn="slideInUp"
          >
            <View
              style={{
                backgroundColor: "white",
                shadowColor: "back",
                width: "100%",
                height: "90%",
                borderRadius: 10,
                padding: 3,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 50,
                  display: "flex",
                  backgroundColor: "#f2f3f4",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  Chat with your customer
                </Text>
                <TouchableOpacity
                  style={{ position: "absolute", right: 20, padding: 10 }}
                  onPress={() => {
                    setMessageModalVisible(false);
                  }}
                >
                  <FontAwesomeIcon icon={faTimesCircle} color="gray" />
                </TouchableOpacity>
              </View>
             <ChatComponent/>
            </View>
          </Modal>
          <TouchableOpacity
            style={tw`absolute bottom-8 right-5 bg-gray-500 h-10 w-10 rounded-full flex items-center justify-center`}
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
