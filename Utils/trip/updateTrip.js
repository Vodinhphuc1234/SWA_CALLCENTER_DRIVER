import getInstance from "../BaseAPI";

const UpdateTrip = async (url, params) => {
  console.log(params);

  const instance = await getInstance();

  var data;

  try {
    const ret = await instance.patch(url, { ...params });
    data = ret.data;
  } catch (e) {
    console.log(e);
    if (e.response) {
      data = e.response;
    }
  }

  console.log(data);
  return data;
};

export default UpdateTrip;
