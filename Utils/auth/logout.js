import AsyncStorage from "@react-native-async-storage/async-storage";
import getInstance from "../BaseAPI";

const logout = async (username, password) => {
  console.log(username, password);
  const instance = await getInstance();
  console.log(instance);
  const token = await AsyncStorage.getItem("token");
  var data;
  try {
    const result = await instance.delete("/driver/login/", {});
    data = result.data;
  } catch (err) {
    data = err.response
  }

  return data;
};

export default logout;
