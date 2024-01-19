import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import * as tf from "@tensorflow/tfjs";
import * as jpeg from "jpeg-js";
import { encode } from "base-64";

import { Q, P } from "../../utils/matrix";

export default function AproveBtn({
  tensor,
  matrixT,
  selectedImage,
  setBase64Img,
}) {
  const workWithTensor = () => {
    let tensor3D = tf.tensor3d(tensor);
    console.log("далее3д тензор");
    tensor3D.print();
    const normalizedTensor = tensor3D.div(tf.scalar(255));

    const PTensor = tf.tensor(P);

    const TTensor = tf.tensor(matrixT);
    console.log("Далее Ttensor");
    TTensor.print();

    const QTensor = tf.tensor(Q);

    console.log("Шейп картинки:", normalizedTensor.shape);
    const result = normalizedTensor.matMul(PTensor) as tf.Tensor3D;
    console.log("Шейп после перемножения на матрицу P:", result.shape);
    const firstTanh = result.tanh() as tf.Tensor3D;
    console.log(
      "Шейп после первого гиперболического тангенса",
      firstTanh.shape
    );
    const secondMatrix = firstTanh.matMul(TTensor) as tf.Tensor3D;
    console.log("Шейп после перемножения на матрицу T:", secondMatrix.shape);
    const secondTanh = secondMatrix.tanh() as tf.Tensor3D;
    console.log(
      "Шейп после второго гиперболического тангенса",
      secondTanh.shape
    );
    const thirdMatrix = secondTanh.matMul(QTensor) as tf.Tensor3D;
    console.log("Шейп после перемножения на матрицу Q:", thirdMatrix.shape);

    normalizedTensor.print();
    thirdMatrix.print();
    const scaledTensor = thirdMatrix.mul(tf.scalar(255));
    console.log("далее создание картинки после преобразования тензора");

    const height = thirdMatrix.shape[0];
    const width = thirdMatrix.shape[1];
    const data = new Buffer(
      tf
        .concat([scaledTensor, tf.ones([height, width, 1]).mul(255)], -1)
        .slice([0], [height, width, 4])
        .dataSync()
    );

    const rawImageData = { data, width, height };
    const jpegImageData = jpeg.encode(rawImageData, 100);

    const imgBase64 = tf.util.decodeString(jpegImageData.data, "base64");
    setBase64Img(imgBase64);
  };

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
