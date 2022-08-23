import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  tripInformation: null,
  user: null,
  driverState: null,
  messages: [],
  notificationToken: null,
  currentVehicle: null,
  customerInfomation: null,
  pingAuth: true,
  pingData: true,
  notificationTrip: false,

  IP: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin(state, action) {
      state.origin = action.payload;
    },
    setDestination(state, action) {
      state.destination = action.payload;
    },
    setTripInformation(state, action) {
      state.tripInformation = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setDriverState(state, action) {
      state.driverState = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    addMessages(state, action) {
      state.messages = [...action.payload, ...state.messages];
    },
    setNotificationToken(state, action) {
      state.notificationToken = action.payload;
    },
    setCurrentVehicle(state, action) {
      state.currentVehicle = action.payload;
    },
    reset(state, action) {
      state.currentVehicle = null;
      state.origin = null;
      state.destination = null;
      state.user = null;
      state.driverState = null;
      state.tripInformation = null;
      state.customerInfomation = null;
    },
    resetTrip(state, action) {
      state.origin = null;
      state.destination = null;
      state.tripInformation = null;
      state.customerInfomation = null;
    },
    setPingAuth(state, action) {
      state.pingAuth = action.payload;
    },
    setPingData(state, action) {
      state.pingData = action.payload;
    },
    setCustomerInfomation(state, action) {
      state.customerInfomation = action.payload;
    },
    setNotificationTrip(state, action) {
      state.notificationTrip = action.payload;
    },
    setIP(state, action) {
      state.IP = action.payload;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setTripInformation,
  setUser,
  setDriverState,
  setMessages,
  addMessages,
  setNotificationToken,
  setCurrentVehicle,
  reset,
  resetTrip,
  setPingAuth,
  setPingData,
  setCustomerInfomation,
  setNotificationTrip,
  setIP,
} = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTripInformation = (state) => state.nav.tripInformation;
export const selectUser = (state) => state.nav.user;
export const selectDriverState = (state) => state.nav.driverState;
export const selectMessages = (state) => state.nav.messages;
export const selectNotificationToken = (state) => state.nav.notificationToken;
export const selectVehicles = (state) => state.nav.vehicles;
export const selectCurrentVehicle = (state) => state.nav.currentVehicle;
export const selectPingAuth = (state) => state.nav.pingAuth;
export const selectPingData = (state) => state.nav.pingData;
export const selectNotificationTrip = (state) => state.nav.notificationTrip;
export const selectIP = (state) => state.nav.IP;

export default navSlice.reducer;
