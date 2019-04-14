import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";

import logo from "../assets/logo.png";

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <TextInput
          style={styles.input}
          placeholder="Crie um box"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 30
  },

  logo: {
    alignSelf: "center"
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    fontSize: 16,
    paddingHorizontal: 28,
    marginTop: 30
  },

  button: {
    height: 48,
    borderColor: "#DDD",
    fontSize: 16,
    paddingHorizontal: 28,
    marginTop: 10,
    backgroundColor: "#7159C1",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFF"
  }
});
