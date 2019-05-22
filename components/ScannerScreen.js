import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Permissions, BarCodeScanner } from "expo";

class ScannerScreen extends Component {
  state = {
    hasCameraPermissions: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermissions: status === "granted" });
  }

  handleBarCodeScanned = ({ type, data }) => {
    const api = `https://www.googleapis.com/books/v1/volumes?q=isbn:${data}`;
    fetch(api)
      .then(response => response.json())
      .then(json => {
        if (json.totalItems === 0) {
          alert(
            `Barcode with type ${type} and data ${data} has been scanned, but no book data was found.`
          );
        } else {
          // we have at least one book
          this.props.navigation.navigate("Details", { data: json.items[0] });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { hasCameraPermissions } = this.state;
    if (hasCameraPermissions === null)
      return <Text>Requesting for camera permission</Text>;
    if (hasCameraPermissions === false) return <Text>No access to camera</Text>;

    return (
      <View style={styles.container}>
        <BarCodeScanner
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
          onBarCodeScanned={this.handleBarCodeScanned}
          style={styles.scanner}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  scanner: {
    width: "90%",
    height: 300
  },
  scanAgainButton: {}
});

export default ScannerScreen;
