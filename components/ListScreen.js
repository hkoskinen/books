import React, { Component } from "react";
import {
  View,
  FlatList,
  AsyncStorage,
  Text,
  ScrollView,
  StyleSheet,
  Button
} from "react-native";

class ListScreen extends Component {
  state = {
    books: [],
    status: ""
  };
  static navigationOptions = {
    title: "All books"
  };
  doStuff = data => {
    this.setState({ books: JSON.parse(data) });
  };
  componentDidMount = async () => {
    try {
      const books = await AsyncStorage.getItem("boooks");
      if (books !== null) {
        //this.setState({ books: JSON.parse(data) });
        this.doStuff(books);
      }
    } catch (err) {
      // don't do anything
    }
  };
  clearStorage = async () => {
    try {
      await AsyncStorage.removeItem("boooks");
      this.setState({ books: [] });
    } catch (err) {
      // skip error handling
    }
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{ height: "100%", padding: 20, justifyContent: "space-between" }}
      >
        {this.state.books && this.state.books.length > 0 ? (
          <View style={{ justifyContent: "space-between" }}>
            {this.state.books.map((book, i) => {
              return (
                <Button
                  style={{
                    marginBottom: 30
                  }}
                  key={book.id + "_" + i}
                  onPress={() => navigate("Details", { data: book })}
                  title={book.volumeInfo.title}
                />
              );
            })}
          </View>
        ) : (
          <View>
            <Text>No books found</Text>
          </View>
        )}

        <Button
          title="Clear books"
          onPress={() => this.clearStorage()}
          type="outline"
          style={{ marginTop: 20 }}
        />
      </View>
    );
  }
}
const detailsStyles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    padding: 20
  }
});

export default ListScreen;
