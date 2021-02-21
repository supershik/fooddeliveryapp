import React from "react"
import { I18nManager } from "react-native"
import Route from "./routes/index.js"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react"
import RNRestart from "react-native-restart"
import { persister, store } from "./redux"

class App extends React.Component {
  componentDidMount = () => {
    if( I18nManager.isRTL ) {
      I18nManager.allowRTL(false)
      I18nManager.forceRTL(false)
      setTimeout(() => {
        RNRestart.Restart();
      }, 500);
    }
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <Route />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
