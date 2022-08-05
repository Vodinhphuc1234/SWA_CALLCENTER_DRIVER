import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import NavigationScreen from "./screens/NavigationScreen";
import { registerRootComponent } from "expo";
import { socket, SocketContext } from "./context/socketContext";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <SocketContext.Provider value={socket}>
            <NavigationScreen />
          </SocketContext.Provider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

registerRootComponent(App);
