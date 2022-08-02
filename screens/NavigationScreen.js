import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import NotificationTripmodal from "../components/NotificationTripmodal";
import { selectUser, setUser } from "../slices/navSlice";
import requestNotificationPermisson from "../Utils/requestNotificationPermisson";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./Login/LoginScreen";
import ProfileEditScreen from "./Profile/ProfileEditScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import RegisterScreen from "./Register/RegisterScreen";
import ProcessingScreen from "./Trip/ProcessingScreen";
import RatingScreen from "./Trip/RatingScreen";
import WellcomeScreen from "./WellcomeScreen";

const NavigationScreen = () => {
  //delecration
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const [notificationTrip, setNotificationTrip] = useState(false);

  //get redux
  let user = useSelector(selectUser);

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  //effect for get current user
  useEffect(() => {
    const asyncUser = async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem("USER_TOKEN");
      } catch (e) {
        console.log(e);
      }
      dispatch(setUser({ userToken: userToken }));
    };

    asyncUser();
  }, []);

  //useRef for hold current of notification and timeout
  const notificationListener = useRef();
  const timer = useRef();

  //effect for reaceive notification
  useEffect(() => {
    let token;
    const asyncGetToken = async () => {
      token = await requestNotificationPermisson(Notifications);
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          console.log(notification.request.content.data);

          if (
            notification.request.content.data.origin &&
            notification.request.content.data.destination
          ) {
            setOrigin({
              ...notification.request.content.data.origin,
            });

            setDestination({
              ...notification.request.content.data.destination,
            });

            setNotificationTrip(true);

            timer.current = setTimeout(() => {
              setNotificationTrip(false);
            }, 10000);
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
  }, []);

  return user && user.userToken ? (
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
          isVisible={notificationTrip}
          setIsVisible={setNotificationTrip}
          timerRef={timer}
        />
      )}
    </>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="WellcomeScreen"
        component={WellcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default NavigationScreen;

const styles = StyleSheet.create({});
