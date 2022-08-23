import getInstance from "../BaseAPI";

const getTripDetail = async (url) => {
  console.log(url);
  const instance = await getInstance();

  var data;

  try {
    const ret = await instance.get(url);

    data = ret.data;
  } catch (e) {
    data = e.reponse;
  }

  return data;
};

export default getTripDetail;
