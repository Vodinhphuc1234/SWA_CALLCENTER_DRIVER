import getInstance from "../BaseAPI";

const updateVehicle = async (url, params) => {
  const instance = await getInstance();
  var data;
  try {
    const ret = await instance.patch(url, { ...params });
    data = ret.data;
  } catch (e) {
    data = e.response
  }
  return data;
};

export default updateVehicle;
