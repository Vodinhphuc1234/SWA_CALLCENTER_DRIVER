const convertTripInformation = (reveicedTrip) => {
  const ret = {};
  ret.tripInformation = {
    price: reveicedTrip.cash,
    distance: reveicedTrip.distance,
    duration: reveicedTrip["estimate_time"],
    paymentMethod: reveicedTrip["payment_method"],
    status: reveicedTrip.status,
    self: reveicedTrip.self,
  };
  ret.origin = {
    description: reveicedTrip["pick_up_address_line"],
    lat: reveicedTrip["pick_up_address_coordinates"].latitude,
    lng: reveicedTrip["pick_up_address_coordinates"].longitude,
  };
  ret.destination = {
    description: reveicedTrip["drop_off_address_line"],
    lat: reveicedTrip["drop_off_address_coordinates"].latitude,
    lng: reveicedTrip["drop_off_address_coordinates"].longitude,
  };
  ret.customerInformation = {
    email: reveicedTrip["rider_email"],
    name: reveicedTrip["rider_name"],
    phoneNumber: reveicedTrip["rider_phone_number"],
  };

  return ret;
};

export default convertTripInformation;
