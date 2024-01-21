import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import * as tf from "@tensorflow/tfjs";
import * as jpeg from "jpeg-js";
import { encode } from "base-64";

import { Q, P } from "../../constants/matrix";

const TensorVisualization = ({
  tensor,
  matrixT,
  selectedImage,
  base64Img,
}: any) => {
  return (
    <View style={styles.container}>
      {base64Img ? (
        <Image
          style={styles.svg1}
          source={{ uri: "data:image/jpeg;base64," + base64Img }}
        />
      ) : (
        <Image style={styles.svg} source={{ uri: selectedImage }} />
      )}
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.txt}>Upload photo</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#1A1825",
    borderRadius: 20,
    height: 401,
    width: 361,
    alignSelf: "center",
    padding: 14,
    gap: 14,
  },
  btn: {
    height: 33,
    width: 150,
    borderWidth: 1,
    borderColor: "#A97DE0",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 160,
  },
  svg: {
    width: 325,
    height: 325,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 1,
  },
  svg1: {
    width: 325,
    height: 325,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 3,
  },
  txt: {
    color: "#D1D1D6",
  },
});
export default TensorVisualization;
