import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInfromation: null,
  user: null,
  driverState: null,
  messages: [],
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
      state.travelTimeInfromation = action.payload;
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
} = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTripInformation = (state) => state.nav.travelTimeInfromation;
export const selectUser = (state) => state.nav.user;
export const selectDriverState = (state) => state.nav.driverState;
export const selectMessages = (state) => state.nav.messages;

export default navSlice.reducer;
