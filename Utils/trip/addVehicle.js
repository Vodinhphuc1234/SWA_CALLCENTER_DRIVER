import getInstance from "../BaseAPI";
import getCurrentLocation from "../getCurrentLocation";

const addVehicle = async (params) => {
  const instance = await getInstance();

  console.log(params);
  const currentLocation = await getCurrentLocation();
  var data;
  try {
    const ret = await instance.post("/driver/vehicles/", {
      ...params,
      is_active: false,
      is_busy: true,
    });
    data = ret.data;
  } catch (e) {
    data = e.response;
  }

  console.log(data);
  return data;
};

export default addVehicle;
