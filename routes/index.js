import "react-native-gesture-handler"
import React, { Component } from "react"
import { View } from "react-native"
import {
  NavigationContainer,
} from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { connect } from "react-redux"

//screens
import Splash from "../screens/Splash"
import Main from "../screens/Main"

const Stack = createStackNavigator()

// stack navigator
class Route extends Component {
  render() {

    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Main" component={Main} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { theme } = state.config;
  return {
    theme,
  };
};

export default connect(
  mapStateToProps,
  {}
)(Route);
