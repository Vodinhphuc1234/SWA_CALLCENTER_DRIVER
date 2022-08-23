import getInstance from "../BaseAPI";

const rejectTrip = async (trip) => {
  const instance = await getInstance();

  var data;

  try {
    const ret = await instance.post("/driver/rejected-trips/", { trip });
    data = ret.data;
  } catch (e) {
    console.log(e.response.data);
    if (e.response) {
      data = e.response;
    }
  }
  return data;
};

export default rejectTrip;
