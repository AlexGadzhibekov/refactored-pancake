import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import * as tf from "@tensorflow/tfjs";
import * as jpeg from "jpeg-js";
import { encode } from "base-64";

import { Q, P } from "../../constants/matrix";

export default function AproveBtn({
  workWithTensor,
}: {
  workWithTensor: () => void;
}) {
  return (
    <TouchableOpacity style={styles.btnAprove} onPress={workWithTensor}>
      <Text style={styles.btnTxt}>Применить</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnAprove: {
    width: 150,
    height: 33,
    backgroundColor: "#A97DE0",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  btnTxt: {
    color: "white",
  },
});
