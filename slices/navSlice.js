import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInfromation: null,
  user: null,
  driverState: null,
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
  },
});

export const {
  setOrigin,
  setDestination,
  setTripInformation,
  setUser,
  setDriverState,
} = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTripInformation = (state) =>
  state.nav.travelTimeInfromation;
export const selectUser = (state) => state.nav.user;
export const selectDriverState = (state) => state.nav.driverState;

export default navSlice.reducer;
