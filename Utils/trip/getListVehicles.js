import getInstance from "../BaseAPI";

const getListVehicles = async () => {
  const instance = await getInstance();
  var data;
  try {
    const ret = await instance.get("/driver/vehicles/");
    data = ret.data;
  } catch (e) {
    if (e.response) {
      data = e.response;
    }
  }
  return data;
};
export default getListVehicles;
