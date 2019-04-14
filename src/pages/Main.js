import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import api from "../services/api";

import logo from "../assets/logo.png";

export default class Main extends Component {
  state = {
    newBox: ""
  };

  async componentDidMount() {
    const box = await AsyncStorage.getItem("@DropBox:box");

    if (box) {
      this.props.navigation.navigate("Box");
    }
  }

  handleSubmit = async e => {
    const response = await api.post("boxes", {
      title: this.state.newBox
    });

    await AsyncStorage.setItem("@DropBox:box", response.data._id);

    this.props.navigation.navigate("Box");
  };

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
          value={this.state.newBox}
          onChangeText={text => this.setState({ newBox: text })}
        />

        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
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
