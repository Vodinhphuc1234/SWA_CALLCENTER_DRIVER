import getInstance from "../BaseAPI";

const sendNotificationToken = async (notificationToken) => {
  const instance = await getInstance();
  var data;
  try {
    const result = await instance.post("/driver/me/devices/", {
      registration_id: notificationToken,
    });
    data = result.data;
  } catch (e) {
    data = e.response
  }

  return data;
};

export default sendNotificationToken;
