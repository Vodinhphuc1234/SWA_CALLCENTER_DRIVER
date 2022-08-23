import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "@rneui/themed";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import NotificationTripmodal from "../components/NotificationTripmodal";
import {
  reset,
  resetTrip,
  selectCurrentVehicle,
  selectDestination,
  selectDriverState,
  selectIP,
  selectNotificationTrip,
  selectOrigin,
  selectTripInformation,
  setCurrentVehicle,
  setCustomerInfomation,
  setDestination,
  setNotificationTrip,
  setOrigin,
  setTripInformation,
} from "../slices/navSlice";
import convertTripInformation from "../Utils/adapter/convertTripInformation";
import getCurrentLocation from "../Utils/getCurrentLocation";
import requestNotificationPermisson from "../Utils/requestNotificationPermisson";
import getListTrips from "../Utils/trip/getListTrips";
import getListVehicles from "../Utils/trip/getListVehicles";
import getTripDetail from "../Utils/trip/getTripDetail";
import rejectTrip from "../Utils/trip/rejectTrip";
import sendNotificationToken from "../Utils/trip/sendNotificationToken";
import UpdateTrip from "../Utils/trip/updateTrip";
import updateVehicle from "../Utils/trip/updateVehicle";
import HomeScreen from "./HomeScreen";
import AddVehicleScreen from "./Profile/AddVehicleScreen";
import HistoryScreen from "./Profile/History";
import IncomeScreen from "./Profile/IncomeScreens";
import ProfileEditScreen from "./Profile/ProfileEditScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import ProcessingScreen from "./Trip/ProcessingScreen";
import RatingScreen from "./Trip/RatingScreen";
const AuthenticatedScreen = () => {
  //delecration
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const navigator = useNavigation();

  //state
  const notificationTrip = useSelector(selectNotificationTrip);
  const [loading, setLoading] = useState(false);
  //get redux
  const tripInfo = useSelector(selectTripInformation);
  const currentVehicle = useSelector(selectCurrentVehicle);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const driverState = useSelector(selectDriverState);
  const { autoGetTrip } = driverState || {
    autoGetTrip: false,
  };
  const IP = useSelector(selectIP);

  //effect for get current vehicle
  useEffect(() => {
    const asyncFunction = async () => {
      const data = await getListVehicles();
      if (data?.status === 403) {
        Alert.alert("Error", data?.data?.message);
        AsyncStorage.removeItem("token");
        dispatch(reset());
      } else if (data?.data?.message) {
        Alert.alert("Error", data?.data?.message);
      } else {
        console.log(data.results);

        data.results.forEach((item) => {
          if (item.is_active) {
            let action = setCurrentVehicle(item);
            dispatch(action);
          }
        });
      }
    };
    asyncFunction();
  }, [IP]);

  //effect for update location

  const intervalId = useRef();
  useEffect(() => {
    const updateVehicleAsync = async () => {
      const currentLocation = await getCurrentLocation();
      const data = await updateVehicle(currentVehicle.self, {
        coordinates: {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        },
      });

      return data;
    };

    intervalId.current = setInterval(async () => {
      if (currentVehicle) {
        const data = await updateVehicleAsync();
        if (data?.status === 403) {
          Alert.alert("Error", data?.data?.message);
          AsyncStorage.removeItem("token");
          dispatch(reset());
        } else if (data?.data?.message) {
          Alert.alert("Error", data.message);
        }
      }
    }, 4000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, [currentVehicle, IP]);

  //useRef for hold current of notification and timeout
  const notificationListener = useRef();
  const timer = useRef();

  //effect for reaceive notification
  useEffect(() => {
    let token;
    const asyncGetToken = async () => {
      token = await requestNotificationPermisson(Notifications);

      console.log(token);
      const data = await sendNotificationToken(token);

      if (data?.status === 403) {
        Alert.alert("Error", data?.data?.message);
        AsyncStorage.removeItem("token");
        dispatch(reset());
      } else if (data?.data?.message) {
        Alert.alert("Error", data.message);
      }
      notificationListener.current =
        Notifications.addNotificationReceivedListener(async (notification) => {
          if (notification.request.content.data.self) {
            const data = await getTripDetail(
              notification.request.content.data.self.replace("localhost", IP)
            );

            if (!data) {
              Alert.alert("Notification about trip", "Your trip is cancled");
              dispatch(resetTrip());
            } else {
              if (data?.status === 403) {
                AsyncStorage.removeItem("token");
                dispatch(reset());
                Alert.alert("Error", data?.data?.message);
                return;
              }
              const reveicedTrip = convertTripInformation(data);
              console.log(reveicedTrip);

              if (reveicedTrip?.tripInformation?.status === "canceled") {
                Alert.alert("Notification about trip", "Your trip is cancled");
                dispatch(resetTrip());
              } else {
                dispatch(
                  setTripInformation({
                    ...reveicedTrip.tripInformation,
                  })
                );

                dispatch(
                  setCustomerInfomation({
                    ...reveicedTrip.customerInformation,
                  })
                );
                dispatch(
                  setOrigin({
                    ...reveicedTrip.origin,
                  })
                );

                dispatch(
                  setDestination({
                    ...reveicedTrip.destination,
                  })
                );

                console.log("Auto get trippppppppppppppppp", autoGetTrip);

                if (!autoGetTrip) {
                  dispatch(setNotificationTrip(true));
                  timer.current = setTimeout(() => {
                    dispatch(setNotificationTrip(false));
                    dispatch(resetTrip());
                  }, 15000);
                } else {
                  const data = await UpdateTrip(
                    reveicedTrip.tripInformation.self,
                    {
                      status: "assigned",
                    }
                  );

                  console.log(data);

                  if (data?.data?.message) {
                    Alert.alert("Error", data?.data?.message);
                  } else {
                    const trip = convertTripInformation(data);
                    dispatch(setTripInformation({ ...trip.tripInformation }));
                  }
                }
              }
            }
          }
        });
      console.log(token);
    };
    asyncGetToken();
    return () => {
      clearTimeout(timer.current);
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, [autoGetTrip, IP]);

  //effect for get current trip
  //effect for get trip
  useEffect(() => {
    const asyncFunc = async () => {
      const data = await getListTrips(500, 0);
      if (data?.status === 403) {
        Alert.alert("Error", data?.data?.message);
        AsyncStorage.removeItem("token");
        dispatch(reset());
      } else if (data?.data?.message) {
        Alert.alert("Error", data.data.message);
      } else {
        if (!data.message) {
          data.results.forEach((item) => {
            if (
              item.status === "assigned" ||
              item.status === "processing" ||
              item.status == "pick_up"
            ) {
              console.log(item);

              const trip = convertTripInformation(item);
              console.log(trip);
              dispatch(
                setTripInformation({
                  ...trip.tripInformation,
                })
              );

              dispatch(
                setCustomerInfomation({
                  ...trip.customerInformation,
                })
              );
              dispatch(
                setOrigin({
                  ...trip.origin,
                })
              );
              dispatch(
                setDestination({
                  ...trip.destination,
                })
              );
            }
          });
        }
      }
    };
    asyncFunc();
  }, [IP]);

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileEditScreen"
          component={ProfileEditScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProcessingScreen"
          component={ProcessingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RatingScreen"
          component={RatingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IncomeScreen"
          component={IncomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HistoryScreen"
          component={HistoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddVehicleScreen"
          component={AddVehicleScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

      <Modal
        isVisible={notificationTrip}
        style={{
          height: "100%",
          width: "100%",
        }}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View style={tw`bg-white h-full w-full`}>
          <Text>notification</Text>
        </View>
      </Modal>

      {origin && destination && (
        <NotificationTripmodal
          origin={origin}
          destination={destination}
          timerRef={timer}
        />
      )}

      {(tripInfo?.status === "processing" ||
        tripInfo?.status === "assigned" ||
        tripInfo?.status == "pick_up") && (
        <View>
          <TouchableOpacity
            style={{
              margin: 10,
              backgroundColor: "green",
              borderRadius: 5,
              padding: 10,
            }}
            onPress={() => {
              navigator.navigate("HomeScreen");
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  backgroundColor: "yellow",
                  width: 90,
                  fontWeight: "600",
                  fontSize: 12,
                  color: "gray",
                  textAlign: "center",
                  borderRadius: 10,
                  padding: 3,
                  marginBottom: 5,
                }}
              >
                {tripInfo.status}
              </Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginRight: 5,
                  }}
                >
                  Price: {tripInfo.price}
                </Text>

                {tripInfo?.status === "assigned" && (
                  <Button
                    disabled={loading}
                    type="outline"
                    buttonStyle={{ borderColor: "red" }}
                    titleStyle={{ color: "red" }}
                    onPress={async () => {
                      setLoading(true);
                      console.log(tripInfo.self);
                      const data = await rejectTrip(
                        tripInfo.self,
                        tripInfo.self
                      );

                      setLoading(false);
                      if (data?.status === 403) {
                        AsyncStorage.removeItem("token");
                        dispatch(reset());
                      } else {
                        Alert.alert("Notification", "Your trip is canceled");
                        dispatch(resetTrip());
                        navigator.navigate("HomeScreen");
                      }
                    }}
                  >
                    {loading ? <ActivityIndicator /> : "Cancel"}
                  </Button>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default AuthenticatedScreen;
