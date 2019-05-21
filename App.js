import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Permissions, BarCodeScanner } from "expo";

export default class App extends React.Component {
  state = {
    hasCameraPermissions: null,
    scanned: false
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermissions: status === "granted" });
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned`);

    const api = `https://www.googleapis.com/books/v1/volumes?q=isbn:${data}`;
    fetch(api)
      .then(response => response.json())
      .then(json => {
        if (json.items) alert(json.items[0].volumeInfo.title);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { hasCameraPermissions, scanned } = this.state;
    if (hasCameraPermissions === null)
      return <Text>Requesting for camera permission</Text>;
    if (hasCameraPermissions === false) return <Text>No access to camera</Text>;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end"
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
