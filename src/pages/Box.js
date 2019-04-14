import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import ImagePicker from "react-native-image-picker";
import api from "../services/api";
import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";

import Icon from "react-native-vector-icons/MaterialIcons";

import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";
import io from "socket.io-client";

export default class Box extends Component {
  state = {
    box: {}
  };

  async componentDidMount() {
    const boxId = await AsyncStorage.getItem("@DropBox:box");
    this.subscribeToNewFiles(boxId);
    const response = await api.get(`boxes/${boxId}`);

    this.setState({
      box: response.data
    });
  }

  openFile = async file => {
    try {
      const filePath = `${RNFS}.DocumentDirectoryPath/${file.title}`;

      await randomFillSync.downloadFile({
        fromUrl: file.url,
        toFile: filePath
      });

      await FileViewer.open(filePath);
    } catch (err) {}
  };

  subscribeToNewFiles = boxId => {
    const io = socket("https://rs-goweek-06-backend.herokuapp.com");

    io.emit("connectRoom", boxId);

    io.on("file", data => {
      console.info("socket.io", data);
      this.setState({
        box: {
          ...this.state.box,
          files: [data, ...this.state.box.files]
        }
      });
    });
  };

  handleUpload = () => {
    // Open Image Library:
    ImagePicker.launchImageLibrary({}, response => {
      const data = new FormData();

      const [prefix, suffix] = upload.fileName.split(".");
      const ext = suffix.toLowerCase() === "heic" ? "jpg" : suffix;

      data.append("file", {
        uri: upload.uri,
        type: upload.type,
        name: `${prefix}.${ext}`
      });

      api.post(`boxes/${this.state.box._id}/file`, data);
    });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {}} style={styles.file}>
      <View style={styles.fileInfo}>
        <Icon name="insert-drive-file" size={24} color="#A5CFFF" />
        <Text style={styles.fileTitle}>{item.title}</Text>
      </View>
      <Text style={styles.fileDate}>
        há{" "}
        {distanceInWords(item.createdAt, new Date(), {
          locale: pt
        })}
      </Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.boxTitle}>{this.state.box.title}</Text>

        <FlatList
          style={styles.list}
          data={this.state.box.files}
          keyExtractor={file => file._id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={this.renderItem}
        />

        <TouchableOpacity style={styles.fab} onPress={this.handleUpload}>
          <Icon name="cloud-upload" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? getStatusBarHeight() : 0,
    flex: 1
  },

  boxTitle: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333"
  },

  list: {
    marginTop: 30
  },

  file: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20
  },

  separator: {
    height: 1,
    backgroundColor: "#EEE"
  },

  fileInfo: {
    flexDirection: "row",
    alignItems: "center"
  },

  fileTitle: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10
  },

  fileDate: {
    fontSize: 14,
    color: "#666"
  },

  fab: {
    position: "absolute",
    right: 30,
    bottom: 30 + getBottomSpace(),
    width: 60,
    height: 60,
    backgroundColor: "#7159c1",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  }
});
