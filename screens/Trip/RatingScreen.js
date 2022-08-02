import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AirbnbRating, Button } from "@rneui/themed";
import tw from "tailwind-react-native-classnames";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCaretRight,
  faCircleQuestion,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import SafeAreaViewAdroid from "../../components/SafeAreaView";

const RatingScreen = () => {
  const [rate, setRate] = useState(4);
  const navigator = useNavigation();
  return (
    <SafeAreaViewAdroid>
      <View style={tw`h-full flex items-center justify-center`}>
        <View>
          <Text style={tw`text-3xl font-bold text-center`}>
            Thank for using our service
          </Text>
          <Text style={tw`text-lg font-medium text-center`}>
            Please, give us your feedback
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <AirbnbRating
            onFinishRating={(number) => {
              setRate(number);
            }}
            defaultRating={rate}
          />
        </View>

        <View style={tw`h-1/5 justify-evenly px-10 mt-20`}>
          <Button
            buttonStyle={{
              backgroundColor: "black",
              borderRadius: 10,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              width: "100%",
            }}
            onPress={() => {
              console.log(rate);
              navigator.navigate("RatingScreen");
            }}
          >
            Feedback
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={tw`ml-2`}
              color="white"
            />
          </Button>

          <Button
            buttonStyle={{
              backgroundColor: "white",
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "black",
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            titleStyle={{
              color: "black",
            }}
            onPress={() => {
              navigator.navigate("HomeScreen");
            }}
          >
            Pick another ride
            <FontAwesomeIcon icon={faCaretRight} style={tw`ml-1`} size={35} />
          </Button>
        </View>
      </View>
    </SafeAreaViewAdroid>
  );
};

export default RatingScreen;

const styles = StyleSheet.create({});
