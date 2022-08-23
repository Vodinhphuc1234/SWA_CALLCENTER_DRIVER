import getInstance from "../BaseAPI";

const getListTrips = async (limit, offset) => {
  const instance = await getInstance();
  var data;
  try {
    const ret = await instance.get("/driver/trips/", { limit, offset });
    data = ret.data;
  } catch (e) {
    data = e.response;
  }
  return data;
};

export default getListTrips;
