import { faExchange } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IPModal from "../components/IPModal";
import {
  selectCurrentVehicle,
  selectIP,
  selectPingAuth,
  selectUser,
  setIP,
  setUser,
} from "../slices/navSlice";
import getInformation from "../Utils/me/getInformation";
import AuthenticatedScreen from "./AuthenticatedScreen";
import LoginScreen from "./Login/LoginScreen";
import RegisterScreen from "./Register/RegisterScreen";
import WellcomeScreen from "./WellcomeScreen";

const NavigationScreen = () => {
  //delecration
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  //get redux
  let user = useSelector(selectUser);
  let pingAuth = useSelector(selectPingAuth);

  const IP = useSelector(selectIP);
  const [visibleNetworkModal, setVisibleNetworkModal] = useState(false);

  //get IP
  useEffect(() => {
    const asyncFunc = async () => {
      const IP = await AsyncStorage.getItem("IP");

      console.log(IP);
      dispatch(setIP(IP));
    };

    asyncFunc();
  }, []);

  //effect for get current user
  useEffect(() => {
    const asyncUser = async () => {
      let userToken = null;

      try {
        userToken = await AsyncStorage.getItem("token");
      } catch (e) {
        console.log(e);
      }

      const data = await getInformation();

      console.log(data);

      if (data?.data?.message) {
        Alert.alert("Authentication Error", data.data.message);
      } else {
        const { user_name, first_name, last_name, email, phone_number } = data;
        dispatch(
          setUser({
            userToken: userToken,
            userName: user_name,
            firstName: first_name,
            lastName: last_name,
            email,
            phoneNumber: phone_number,
          })
        );
      }
    };

    asyncUser();
  }, [pingAuth, IP]);

  return (
    <>
      {IP &&
        (user && user.userToken ? (
          <AuthenticatedScreen />
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
        ))}

      <TouchableOpacity
        style={{
          position: "absolute",
          top: "50%",
          left: 10,
          padding: 15,
          backgroundColor: "lightgray",
          borderRadius: 50,
        }}
        onPress={() => {
          setVisibleNetworkModal(true);
        }}
      >
        <FontAwesomeIcon icon={faExchange} />
      </TouchableOpacity>
      <IPModal
        visible={!IP || visibleNetworkModal}
        setVisibleNetworkModal={setVisibleNetworkModal}
      />
    </>
  );
};

export default NavigationScreen;

const styles = StyleSheet.create({});

// mới vào lấy current vehicle sau đó lây api để lấy curren vehicle

// useEffect(() => {
//   // send a message to the server
//   socket.emit("onJoin", "driver", "trip");

//   // receive a message from the server
//   socket.on("sendMessage", (message) => {
//     console.log("receive");
//     const { text, createdAt, from } = message;

//     var messages = [];
//     messages.push({
//       _id: Math.random() * 10,
//       text: text,
//       createdAt: createdAt,
//       user: {
//         _id: 2,
//         name: "React Native",
//         avatar: "https://placeimg.com/140/140/any",
//       },
//     });
//     handleAddMessages(messages);
//     console.log(text, createdAt, from);
//   });
// }, []);

// const socket = useContext(SocketContext);

// const handleAddMessages = (tempMessages) => {
//   const sendedMessages = [];
//   tempMessages.forEach((message) => {
//     sendedMessages.push({
//       ...message,
//       createdAt: `${message.createdAt}`,
//     });
//   });
//   console.log(sendedMessages);
//   const action = addMessages(sendedMessages);
//   dispatch(action);
// };
