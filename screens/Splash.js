import React from "react";
import { View, StyleSheet, Image, StatusBar } from "react-native";
import Theme from "../Theme";

class Splash extends React.Component {
  componentDidMount() {
    setTimeout((navigation) => {
      this.props.navigation.navigate("Main");
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />

        <Image source={Theme.logofull} style={styles.logo} />
      </View>
    );
  }
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.primaryExtraLight,
  },
  logo: {
    height: 250,
    width: 300,
    resizeMode: "contain",
  },
});
