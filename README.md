

# TensorflowJS EfficientNet  
![Node.js CI](https://github.com/ntedgi/node-efficientnet/workflows/Node.js%20CI/badge.svg?branch=main) [![Coverage Status](https://coveralls.io/repos/github/ntedgi/node-efficientnet/badge.svg?branch=main)](https://coveralls.io/github/ntedgi/node-efficientnet?branch=main) [![Build Status](https://travis-ci.org/ntedgi/node-efficientnet.svg?branch=main)](https://travis-ci.org/ntedgi/node-efficientnet)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/09917d9ddf9c42648eb60d7d917f5026)](https://www.codacy.com/gh/ntedgi/node-efficientnet/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ntedgi/node-efficientnet&amp;utm_campaign=Badge_Grade)
[![Run on Repl.it](https://repl.it/badge/github/ntedgi/node-efficientnet)](https://repl.it/github/ntedgi/node-efficientnet)

### Under Construction 👷 currently supporting only B0 checkpoint


This repository contains a nodeJs wrapper of **EfficientNet**, a lightweight convolutional neural network architecture achieving the [state-of-the-art accuracy with an order of magnitude fewer parameters and FLOPS](https://arxiv.org/abs/1905.11946), on both ImageNet and
five other commonly used transfer learning datasets.

The codebase is heavily inspired by the [TensorFlow implementation](https://github.com/tensorflow/tpu/tree/master/models/official/efficientnet).

## Table of Contents

 1. [Installation](#installation)    
 2. [Examples](#examples)
 3. [About EfficientNet Models](#about-efficientnet-models)
 4. [Models](#models)

## Installation

```node
npm i --save node-efficientnet
```

## Examples

```node
import * as  fs from 'fs';
import * as nodeFetch from 'node-fetch';

import {
    EfficientnetCheckPointFactory,
    EfficientnetCheckPoint,
    EfficientnetModel
} from "node-efficientnet"

const images = ['car.jpg', 'panda.jpg']
const imageDir = "./samples"
const imageDirRemoteUri = "https://raw.githubusercontent.com/ntedgi/node-efficientnet/main/samples"

if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir);
}

async function download(image: String, cb: fs.NoParamCallback) {
    const response = await nodeFetch.default(`${imageDirRemoteUri}/${image}`);
    const buffer = await response.buffer();
    fs.writeFile(`${imageDir}/${image}`, buffer, cb)
}


EfficientnetCheckPointFactory.create(EfficientnetCheckPoint.B0)
    .then((model: EfficientnetModel) => {
        images.forEach(async (image) => {
            await download(image, () => {
                model.inference(`${imageDir}/${image}`).then((result: { result: any; }) => {
                    console.log(result.result)
                })
            })

        })
    })
    .catch((e: Error) => {
        console.error(e)
    })

```
output :
```
[
  { label: 'sports car, sport car', precision: 88.02440940394301 },
  {
    label: 'racer, race car, racing car',
    precision: 6.647441678387659
  },
  { label: 'car wheel', precision: 5.3281489176693295 }
]
[
  {
    label: 'giant panda, panda, panda bear, coon bear, Ailuropoda melanoleuca',
    precision: 83.60747593436018
  },
  { label: 'skunk, polecat, wood pussy', precision: 11.61300759424677 },
  {
    label: 'hog, pig, grunter, squealer, Sus scrofa',
    precision: 4.779516471393051
  }
]

```



## About EfficientNet Models

EfficientNets rely on AutoML and compound scaling to achieve superior performance without compromising resource efficiency. The [AutoML Mobile framework](https://ai.googleblog.com/2018/08/mnasnet-towards-automating-design-of.html) has helped develop a mobile-size baseline network, **EfficientNet-B0**, which is then improved by the compound scaling method  to obtain EfficientNet-B1 to B7.

<table border="0">
<tr>
    <td>
    <img src="https://raw.githubusercontent.com/tensorflow/tpu/master/models/official/efficientnet/g3doc/params.png" width="100%" />
    </td>
    <td>
    <img src="https://raw.githubusercontent.com/tensorflow/tpu/master/models/official/efficientnet/g3doc/flops.png", width="90%" />
    </td>
</tr>
</table>

EfficientNets achieve state-of-the-art accuracy on ImageNet with an order of magnitude better efficiency:

* In high-accuracy regime, EfficientNet-B7 achieves the state-of-the-art 84.4% top-1 / 97.1% top-5 accuracy on ImageNet with 66M parameters and 37B FLOPS. At the same time, the model is 8.4x smaller and 6.1x faster on CPU inference than the former leader, [Gpipe](https://arxiv.org/abs/1811.06965).

* In middle-accuracy regime, EfficientNet-B1 is 7.6x smaller and 5.7x faster on CPU inference than [ResNet-152](https://arxiv.org/abs/1512.03385), with similar ImageNet accuracy.

* Compared to the widely used [ResNet-50](https://arxiv.org/abs/1512.03385), EfficientNet-B4 improves the top-1 accuracy from 76.3% of ResNet-50 to 82.6% (+6.3%), under similar FLOPS constraints.

## Models

The performance of each model variant using the pre-trained weights converted from checkpoints provided by the authors is as follows:

| Architecture   | @top1* Imagenet| @top1* Noisy-Student| 
| -------------- | :----: |:---:|
| EfficientNetB0 | 0.772  |0.788|
| EfficientNetB1 | 0.791  |0.815|
| EfficientNetB2 | 0.802  |0.824|
| EfficientNetB3 | 0.816  |0.841|
| EfficientNetB4 | 0.830  |0.853|
| EfficientNetB5 | 0.837  |0.861|
| EfficientNetB6 | 0.841  |0.864|
| EfficientNetB7 | 0.844  |0.869|

**\*** - topK accuracy score for converted models (imagenet `val` set)
