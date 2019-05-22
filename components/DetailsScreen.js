import React, { Component } from "react";
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  Button
} from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";

class DetailsScreen extends Component {
  state = {
    status: ""
  };
  static navigationOptions = {
    title: "Details"
  };

  save = async data => {
    try {
      // check if we already have books
      this.refs.toast.show("Book data saved", DURATION.LENGTH_SHORT);
      let books = await AsyncStorage.getItem("boooks");
      if (books === null) {
        books = [];
        books.push(data);
        await AsyncStorage.setItem("boooks", JSON.stringify(books));
      } else {
        // we have already data
        books = JSON.parse(books);
        books.push(data);
        await AsyncStorage.setItem("boooks", JSON.stringify(books));
      }
    } catch (err) {
      // do something with error
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const data = this.props.navigation.getParam("data");
    const { status } = this.state;

    return (
      <ScrollView contentContainerStyle={detailsStyles.contentContainer}>
        <Text>{status}</Text>
        <Image
          source={{
            uri: data.volumeInfo.imageLinks.smallThumbnail.replace(
              "http",
              "https"
            )
          }}
        />
        <Text style={{ fontSize: 28 }}>{data.volumeInfo.title}</Text>
        <Text style={{ fontSize: 20, color: "#888" }}>
          {data.volumeInfo.subtitle}
        </Text>
        <Text style={{ marginBottom: 20 }}>
          {data.volumeInfo.authors.join(", ")}
        </Text>
        <Text style={{ lineHeight: 20, marginBottom: 20 }}>
          {data.volumeInfo.description}
        </Text>
        <Text style={{}}>
          Published {data.volumeInfo.publishedDate} by{" "}
          {data.volumeInfo.publisher}
        </Text>
        <Text style={{ marginBottom: 20 }}>
          Pages: {data.volumeInfo.pageCount}
        </Text>
        <Button title="Save book data" onPress={() => this.save(data)} />
        <Toast ref="toast" />
      </ScrollView>
    );
  }
}

const detailsStyles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    padding: 20
  }
});

export default DetailsScreen;
