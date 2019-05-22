import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Permissions, BarCodeScanner } from "expo";
import { createStackNavigator, createAppContainer } from "react-navigation";

import {
  HomeScreen,
  DetailsScreen,
  ListScreen,
  ScannerScreen
} from "./components";

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
  List: { screen: ListScreen },
  Scanner: { screen: ScannerScreen }
});

const App = createAppContainer(MainNavigator);
export default App;

class App2 extends React.Component {
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
      <View style={styles.container}>
        <BarCodeScanner
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={styles.scanner}
        />
        <Button
          title={"Scan again"}
          onPress={() => this.setState({ scanned: false })}
          style={styles.scanAgainButton}
          color={"darkslateblue"}
          disabled={!scanned}
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
