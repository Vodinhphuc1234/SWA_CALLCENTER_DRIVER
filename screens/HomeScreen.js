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
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import ChatComponent from "../components/ChatComponent";
import TripArrivedNav from "../components/Driver/TripArrivedNav";
import TripProcessingNav from "../components/Driver/TripProcessingNav";
import Map from "../components/Map";
import StateModal from "../components/StateModal";
import {
  reset,
  selectCurrentVehicle,
  selectDestination,
  selectDriverState,
  selectIP,
  selectOrigin,
  selectPingAuth,
  selectPingData,
  selectTripInformation,
  setDriverState,
  setPingAuth,
} from "../slices/navSlice";
import logout from "../Utils/auth/logout";
import getListVehicles from "../Utils/trip/getListVehicles";

const HomeScreen = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const [invisibleModal, setInvisibleModal] = useState(false);

  const driverState = useSelector(selectDriverState);
  const { autoGetTrip } = driverState || {
    autoGetTrip: false,
  };
  const toggleAutoGetTrip = () => {
    dispatch(
      setDriverState({
        autoGetTrip: !autoGetTrip,
      })
    );
  };

  const pingData = useSelector(selectPingData);
  const pingAuth = useSelector(selectPingAuth);
  const IP = useSelector(selectIP);

  let origin = useSelector(selectOrigin);
  let destination = useSelector(selectDestination);
  let tripInfo = useSelector(selectTripInformation);

  const Stack = createNativeStackNavigator();

  //message modal
  const [messageModalVisible, setMessageModalVisible] = useState(false);

  // get vehicle
  const currentVehicle = useSelector(selectCurrentVehicle);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const asyncFunc = async () => {
      let data = await getListVehicles();
      console.log(data);
      if (data?.status === 403) {
        Alert.alert("Error", data?.data?.message);
        AsyncStorage.removeItem("token");
        dispatch(reset());
        setVehicles([]);
      } else if (data?.data?.message) {
        Alert.alert("Error", data.message);
        setVehicles([]);
      } else {
        const vehicles = data.results.filter(
          (item) => !currentVehicle || item.self !== currentVehicle.self
        );

        setVehicles(vehicles);
      }
    };

    asyncFunc();
  }, [currentVehicle, pingData, IP]);

  return (
    <>
      <SafeAreaView>
        <View style={[tw`${origin && destination && "h-3/4"}`]}>
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
              <ChatComponent />
            </View>
          </Modal>
          <TouchableOpacity
            style={tw`absolute bottom-8 right-5 bg-gray-500 h-10 w-10 rounded-full flex items-center justify-center`}
            onPress={async () => {
              const data = await logout();
              console.log(data);
              dispatch(reset());
              dispatch(setPingAuth(!pingAuth));
              await AsyncStorage.removeItem("token");
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
        {origin &&
          destination &&
          (tripInfo?.status == "assigned" || tripInfo?.status == "pick_up") && (
            <View style={tw`h-1/4 z-50 p-5`}>
              <Stack.Navigator>
                {tripInfo?.status == "assigned" && (
                  <Stack.Screen
                    name="TripProcessingNav"
                    component={TripProcessingNav}
                    options={{
                      headerShown: false,
                    }}
                  />
                )}
                {tripInfo?.status == "pick_up" && (
                  <Stack.Screen
                    name="TripArrivedNav"
                    component={TripArrivedNav}
                    options={{
                      headerShown: false,
                    }}
                  />
                )}
              </Stack.Navigator>
            </View>
          )}
      </SafeAreaView>
      <StateModal
        currentVehicle={currentVehicle}
        vehicles={vehicles}
        setIsVisibleModal={setInvisibleModal}
        isVisibleModal={invisibleModal}
        toggleAutoGetTrip={toggleAutoGetTrip}
        autoGetTrip={autoGetTrip}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
