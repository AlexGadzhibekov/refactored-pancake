import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Slider } from "react-native-elements";
import FilePicker from "../FilePicker/FilePicker";

export default function FilterInterpolation({
  sliderValue,
  setSliderValue,
  matrixT,
  setMatrixT,
}: any) {
  const onSliderValueChange = (value: number) => {
    setSliderValue(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.file__container}>
        <Text style={styles.txt}>File</Text>
        <FilePicker setMatrixT={setMatrixT} />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Slider
          style={styles.slider}
          value={sliderValue}
          onValueChange={onSliderValueChange}
          minimumValue={0}
          maximumValue={100}
          step={1}
          thumbStyle={{ height: 15, width: 15, backgroundColor: "#A97DE0" }}
          thumbTintColor="#A97DE0"
          trackStyle={{ height: 11, width: 338, backgroundColor: "lightgreen" }}
          maximumTrackTintColor="#13111C"
          minimumTrackTintColor="#A97DE0"
        />
        <Text style={styles.sliderValue}> {sliderValue} %</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 360,
    height: 132,
    backgroundColor: "#191724",
    alignSelf: "center",
    padding: 10,
    borderRadius: 24,
  },
  file__container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  txt: {
    color: "#FFFFFF",
  },
  sliderValue: {
    color: "#FFFFFF",
    marginLeft: 250,
  },
  slider: {
    width: "100%",
  },
  btn: {
    width: 150,
    height: 33,
    backgroundColor: "#A97DE0",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
