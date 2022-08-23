import {
  faArrowAltCircleUp,
  faArrowLeft,
  faArrowUp,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/base";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Collapsible from "react-native-collapsible";
import tw from "tailwind-react-native-classnames";
import CustomCalendar from "../../components/Calendar";
import SafeAreaViewAdroid from "../../components/SafeAreaView";
import TripItem from "../../components/TripItem";
const IncomeScreen = () => {
  const navigator = useNavigation();
  const [selected, setSelected] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [collapsedCalendar, setCollapsedCalendar] = useState(true);

  return (
    <SafeAreaViewAdroid>
      <View style={tw`h-full p-5 bg-white`}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity
              onPress={() => {
                navigator.goBack();
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} size={20} />
            </TouchableOpacity>
            <Text style={tw`text-xl font-bold ml-5`}>Income</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setCollapsedCalendar(false);
            }}
          >
            <FontAwesomeIcon icon={faCalendarAlt} size={20} />
          </TouchableOpacity>
        </View>

        <Collapsible collapsed={collapsedCalendar}>
          <CustomCalendar
            selected={selected}
            onDayPress={(date) => {
              setSelected(date.dateString);
            }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              left: "46%",
              backgroundColor: "gray",
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setCollapsedCalendar(true);
            }}
          >
            <FontAwesomeIcon icon={faArrowUp} color={"white"} />
          </TouchableOpacity>
        </Collapsible>

        <View
          style={{
            width: "100%",
            paddingHorizontal: 10,
            paddingVertical: 20,
            backgroundColor: "lightblue",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "500", fontSize: 30 }}>
            1.000.000 VND
          </Text>
          <Text style={{ color: "white", fontWeight: "500", fontSize: 20 }}>
            30 complete ride
          </Text>
        </View>

        <Divider style={{ marginVertical: 10 }} />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={tw`text-xl font-bold`}>{selected}</Text>
        </View>
        <ScrollView>
          <TripItem
            customerName="Vo Dinh Phuc"
            originName="170/32/1 Bui Dinh Tuy, ward 12, district Binh Thanh, Ho Chi Minh city"
            destinationName="170/32/1 Bui Dinh Tuy, ward 12, district Binh Thanh, Ho Chi Minh city"
            price="1.000.000 VND"
          />
          <TripItem
            customerName="Vo Dinh Phuc"
            originName="170/32/1 Bui Dinh Tuy, ward 12, district Binh Thanh, Ho Chi Minh city"
            destinationName="170/32/1 Bui Dinh Tuy, ward 12, district Binh Thanh, Ho Chi Minh city"
            price="1.000.000 VND"
          />
          <TripItem
            customerName="Vo Dinh Phuc"
            originName="170/32/1 Bui Dinh Tuy, ward 12, district Binh Thanh, Ho Chi Minh city"
            destinationName="170/32/1 Bui Dinh Tuy, ward 12, district Binh Thanh, Ho Chi Minh city"
            price="1.000.000 VND"
          />
        </ScrollView>
      </View>
    </SafeAreaViewAdroid>
  );
};

export default IncomeScreen;

const styles = StyleSheet.create({});
