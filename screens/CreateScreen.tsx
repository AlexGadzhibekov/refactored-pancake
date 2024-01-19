import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs";
import * as jpeg from "jpeg-js";
import RNFetchBlob from "react-native-fetch-blob";
import RNFS from "react-native-fs";
import Canvas from "react-native-canvas";
import Icon from "react-native-vector-icons/FontAwesome";

import TensorVisualization from "../components/TensorVisualization/TensorVisualization";
import FilterInterpolation from "../components/FilterInterpolation/FilterInterpolation";

import { Q, P } from "../utils/matrix";
import AproveBtn from "../components/AproveBtn/Aprovebtn";

export default function CreateScreen() {
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [imageTensor, setImageTensor] = useState<number[][][]>();
  const [imageFirstTensor, setFirstImageTensor] = useState<number[][][]>();
  const [tensorRedy, setTensorRedy] = useState<boolean>(false);
  const [matrixT, setMatrixT] = useState();
  const [base64Img, setBase64Img] = useState();
  //Функция для выбора изображения
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
    console.log(result.assets[0].uri);
    await tf.ready();
    console.log("starting inference with picked image: " + selectedImage);
    // Создание тензора изображения

    const response = await fetch(result.assets[0].uri, {}, { isBinary: true });
    const imageDataArrayBuffer = await response.arrayBuffer();
    const imageData = new Uint8Array(imageDataArrayBuffer);

    // Decode image data to a tensor
    const tensor = decodeJpeg(imageData) as tf.Tensor3D;
    const transformedImage = tensor.arraySync();

    tensor.print();
    console.log(tensor.shape);
    alert("Изображение загружено");
    setImageTensor(transformedImage);
    setTensorRedy(true);
  };

  // Функция для загрузки изображения и преобразования его в тензор

  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#13111C" }}
    >
      {selectedImage ? (
        <View style={styles.filteredImage}>
          <TensorVisualization
            tensor={imageTensor}
            matrixT={matrixT}
            selectedImage={selectedImage}
            base64Img={base64Img}
          />
          <FilterInterpolation
            setSliderValue={setSliderValue}
            sliderValue={sliderValue}
            matrixT={matrixT}
            setMatrixT={setMatrixT}
          />
          <AproveBtn
            tensor={imageTensor}
            matrixT={matrixT}
            selectedImage={selectedImage}
            setBase64Img={setBase64Img}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            pickImage();
          }}
        >
          <Icon name="plus" size={30} color="white" />
          <Text style={styles.txt}> Upload photo </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 300,
    width: 300,
    backgroundColor: "#13111C",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#A97DE0",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    color: "white",
  },
  txt: {
    color: "white",
    fontSize: 20,
  },
  filteredImage: {
    gap: 20,
  },
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
