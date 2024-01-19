import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

const FilePicker = ({ setMatrixT }) => {
  async function pickDocument() {
    let result = await DocumentPicker.getDocumentAsync({});
    const fileContent = await FileSystem.readAsStringAsync(
      result.assets[0].uri
    );
    const jsonObject = JSON.parse(fileContent);
    let T = jsonObject.T;
    setMatrixT(T);
    console.log(T);
    alert("Файл загружен");
  }

  return (
    <TouchableOpacity style={styles.btn} onPress={pickDocument}>
      <Text style={styles.txt}>Brouse</Text>
    </TouchableOpacity>
  );
};
export default FilePicker;

const styles = StyleSheet.create({
  btn: {
    width: 150,
    height: 33,
    backgroundColor: "#A97DE0",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    color: "#FFFFFF",
  },
});
