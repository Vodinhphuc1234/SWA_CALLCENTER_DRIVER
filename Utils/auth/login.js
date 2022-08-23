import getInstance from "../BaseAuthApi";

const login = async (username, password) => {
  console.log(username, password);
  const instance = await getInstance();
  console.log(instance);

  var data;
  try {
    const result = await instance.post("/driver/login/", {
      username,
      password,
    });
    data = result.data;
  } catch (err) {
    if (err.response) {
      data = err.response;
    }
  }

  return data;
};

export default login;
