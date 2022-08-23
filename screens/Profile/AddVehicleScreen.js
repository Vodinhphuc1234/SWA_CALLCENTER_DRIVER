import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import SafeAreaViewAdroid from "../../components/SafeAreaView";
import RNPickerSelect from "react-native-picker-select";
import { Button, Divider } from "@rneui/base";
import addVehicle from "../../Utils/trip/addVehicle";
import { useDispatch, useSelector } from "react-redux";
import { reset, selectPingData, setPingData } from "../../slices/navSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "@rneui/themed";

const AddVehicleScreen = () => {
  const navigator = useNavigation();
  const [carType, setCarType] = useState(null);
  const [carName, setCarName] = useState("");
  const [loading, setloading] = useState(false);
  const pingData = useSelector(selectPingData);
  const dispatch = useDispatch();

  return (
    <SafeAreaViewAdroid>
      <View style={tw`h-full p-5 bg-white`}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity
            onPress={() => {
              navigator.navigate("HomeScreen");
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={20} />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold ml-5 flex-grow`}>
            List vehicles
          </Text>
        </View>

        <Divider style={{ marginTop: 20 }} />

        <View>
          <RNPickerSelect
            onValueChange={(value) => {
              setCarType(value);
            }}
            items={[
              { label: "Four seats", value: "four_seats" },
              { label: "Six seats", value: "six_seats" },
            ]}
          />
        </View>
        <Divider style={{ marginBottom: 20 }} width={1.5} />

        <Input
          value={carName}
          placeholder="Vehicle name..."
          style={{ fontSize: 16 }}
          onChangeText={(value) => {
            setCarName(value);
          }}
        />

        <Button
          disabled={carType == null || carName.length === 0 || loading}
          onPress={async () => {
            setloading(true);
            const data = await addVehicle({ car_type: carType, name: carName });

            if (data?.status == 403) {
              Alert.alert("Error", data.data.message);
              AsyncStorage.removeItem("token");
              dispatch(reset());
            } else if (data?.data?.message) {
              Alert.alert("Error", data.data.message);
            } else {
              dispatch(setPingData(!pingData));
            }
            setloading(false);
          }}
        >
          {loading ? <ActivityIndicator /> : "Add Vehicle"}
        </Button>
      </View>
    </SafeAreaViewAdroid>
  );
};

export default AddVehicleScreen;

const styles = StyleSheet.create({});
