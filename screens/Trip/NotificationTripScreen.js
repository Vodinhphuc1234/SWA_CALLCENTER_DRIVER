import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeAreaViewAdroid from "../../components/SafeAreaView";
import tw from "tailwind-react-native-classnames";
import { Button, Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const NotificationTripScreen = () => {
  const navigator = useNavigation();
  return (
    <SafeAreaViewAdroid>
      <View style={tw`p-8 h-full bg-white flex`}>
        <View
          style={tw`bg-gray-50 p-5 border-dotted border-2 border-gray-300 mb-10`}
        >
          <View style={tw``}>
            <Text style={tw`text-lg font-bold`}>170/32/4 Bui Dinh Tuy</Text>
            <Text style={tw`text-gray-500`}>
              170/32/4 Bui Dinh Tuy, Ward 12, Binh Thanh District, Ho Chi Minh
              city
            </Text>
            <Divider style={tw`my-5`} />

            <Text style={tw`text-lg font-bold`}>170/32/4 Bui Dinh Tuy</Text>
            <Text style={tw`text-gray-500`}>
              170/32/4 Bui Dinh Tuy, Ward 12, Binh Thanh District, Ho Chi Minh
              city
            </Text>
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
              navigator.navigate("HomeScreen");
            }}
          >
            Cancel
          </Button>
          <Button buttonStyle={tw`bg-green-500`} containerStyle={tw`flex-grow`}>
            Accept
          </Button>
        </View>
      </View>
    </SafeAreaViewAdroid>
  );
};

export default NotificationTripScreen;

const styles = StyleSheet.create({});
