# TensorflowJS EfficientNet

![npm](https://img.shields.io/npm/v/node-efficientnet) ![Node.js CI](https://github.com/ntedgi/node-efficientnet/workflows/Node.js%20CI/badge.svg?branch=main) [![Coverage Status](https://coveralls.io/repos/github/ntedgi/node-efficientnet/badge.svg?branch=main&service=github)](https://coveralls.io/github/ntedgi/node-efficientnet?branch=main) [![Build Status](https://travis-ci.org/ntedgi/node-efficientnet.svg?branch=main)](https://travis-ci.org/ntedgi/node-efficientnet)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/09917d9ddf9c42648eb60d7d917f5026)](https://www.codacy.com/gh/ntedgi/node-efficientnet/dashboard?utm_source=github.com&utm_medium=referral&utm_content=ntedgi/node-efficientnet&utm_campaign=Badge_Grade)
[![Run on Repl.it](https://repl.it/badge/github/ntedgi/node-efficientnet)](https://repl.it/github/ntedgi/node-efficientnet)
<a href="https://www.npmjs.com/package/node-efficientnet"><img src="https://img.shields.io/npm/l/node-efficientnet.svg" alt="License"></a>  
<a href="https://npmcharts.com/compare/node-efficientnet?minimal=true"><img src="https://img.shields.io/npm/dm/node-efficientnet.svg" alt="Downloads"></a>
<a href="https://npmcharts.com/compare/node-efficientnet?minimal=true"><img src="https://img.shields.io/npm/dt/node-efficientnet.svg" alt="Downloads"></a>
[![Gitter](https://badges.gitter.im/node-efficientnet/community.svg)](https://gitter.im/node-efficientnet/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

#

This repository contains a tensorflowJs implementation of **EfficientNet**,
an object detection model trained on [ImageNet](http://www.image-net.org/) and can detect [1000 different objects](https://storage.googleapis.com/download.tensorflow.org/data/ImageNetLabels.txt).

EfficientNet a lightweight convolutional neural network architecture achieving the [state-of-the-art accuracy with an order of magnitude fewer parameters and FLOPS](https://arxiv.org/abs/1905.11946), on both ImageNet and
five other commonly used transfer learning datasets.

The codebase is heavily inspired by the [TensorFlow implementation](https://github.com/tensorflow/tpu/tree/master/models/official/efficientnet).

#
[Test The Model Online (http://nodeefficientnet.ml/) ](http://nodeefficientnet.ml/)

![Alt Text](https://raw.githubusercontent.com/ntedgi/node-efficientnet/main/media/sample.gif)

#
## 👏 Supporters

### &#8627; Stargazers

[![Stargazers repo roster for @ntedgi/node-efficientnet](https://reporoster.com/stars/ntedgi/node-efficientnet)](https://github.com/ntedgi/node-efficientnet/stargazers)

### &#8627; Forkers

[![Forkers repo roster for @ntedgi/node-efficientnet](https://reporoster.com/forks/ntedgi/node-efficientnet)](https://github.com/ntedgi/node-efficientnet/network/members)
## Multilingual status

| locale  |           status           |              translate by 👑               | 
|:-------:|:--------------------------:|:------------------------------------------:|
|  `en`   |             ✅              |                                            |
|  `zh`   |             ✅              |  [@luoye-fe](https://github.com/luoye-fe)  |
|  `es`   |             ✅              |     [@h383r](https://github.com/h383r)     |
|  `ar`   |             ✅              |   [@lamamyf](https://github.com/lamamyf)   |
|  `he`   |             ✅              | [@jhonDoe15](https://github.com/jhonDoe15) |
| `other` | ⏩ (need help, PR welcome ) |                                            |

#

## Table of Contents

1.  [Just Want to Play With The Model](#how-i-run-this-project-locally-)
2.  [Installation](#installation)
3.  [API](#api)
4.  [Examples](#examples)
5.  [Usage](#usgae)
6.  [About EfficientNet Models](#about-efficientnet-models)
7.  [Models](#models)
8.  [Multilingual status](#multilingual-status)

## How I Run This Project Locally ?

- clone this repository
- Just Want to Play ?
  - At the root project go to playground directory, Run: `docker-compose up`
  - Navigate to http://localhost:8080

## Usage:

EfficientNet has 8 different model checkpoints each checkpoint as different input layer resolution
for larger input layer resolution, the greater the accuracy and the running time is slower.

for example lets take this images:

<table border="0">
<tr>
    <td>
      <img src="https://raw.githubusercontent.com/ntedgi/node-efficientnet/main/samples/panda.jpg" width="100%" />
    </td>
    <td>
       <table border="0">
        <tr>
          <td>Model</td>
          <td>Prediction</td>
        </tr>
        <tr>
          <td>EfficientNetB0</td>
          <td>('Giant panda',83.607) , ( 'Skunk',11.61) , ('hog',4.772)</td>
        </tr>
        <tr>
          <td>EfficientNetB7</td>
          <td>('Giant panda',90.406) , ( 'American black bear',7.07) , ('Badger',2.5192)</td>
        </tr>
      </table>
    </td>
</tr>
<tr>
    <td>
      <img src="https://raw.githubusercontent.com/ntedgi/node-efficientnet/main/samples/fish.jpg" width="100%" />
    </td>
    <td>
       <table border="0">
        <tr>
          <td>Model</td>
          <td>Prediction</td>
        </tr>
        <tr>
          <td>EfficientNetB3</td>
          <td>('goldfish, Carassius auratus',82.5) , ( 'starfish, sea star',9.26) , ('corn'',7.33)</td>
        </tr>
        <tr>
          <td>EfficientNetB7</td>
          <td>('goldfish, Carassius auratus',97.5) , ( 'starfish, sea star',1.46) , ('corn'',0.93)</td>
        </tr>
      </table>
    </td>
</tr>
<tr>
    <td>
      <img src="https://raw.githubusercontent.com/ntedgi/node-efficientnet/main/samples/car.jpg" width="100%" />
    </td>
    <td>
       <table border="0">
        <tr>
          <td>Model</td>
          <td>Prediction</td>
        </tr>
        <tr>
          <td>EfficientNetB0</td>
          <td>('Sports Car',88.02) , ( 'racing car',6.647) , ('car wheel',5.32)</td>
        </tr>
         <tr>
          <td>EfficientNetB7</td>
          <td>('Sports Car',87.68) , ( 'convertible'',7.831) , ('car wheel',4.485)</td>
        </tr>
      </table>
    </td>
</tr>
<tr>
    <td>
      <img src="https://raw.githubusercontent.com/ntedgi/node-efficientnet/main/samples/gun.jpg" width="100%" />
    </td>
    <td>
       <table border="0">
        <tr>
          <td>Model</td>
          <td>Prediction</td>
        </tr>
        <tr>
          <td>EfficientNetB0</td>
              <td>('revolver',85.52) , ( 'assault rifle',9.85) , ('rifle',4.6197)</td>
        </tr>
        <tr>
          <td>EfficientNetB7</td>
          <td>('revolver',88.13) , ( 'rifle',8.29) , ('assault rifle',3.56)</td>
        </tr>
      </table>
    </td>
</tr>
    
    
</table>

#

## Installation

```node
npm i --save node-efficientnet
```

## API

### `EfficientNetCheckPointFactory.create(checkPoint: EfficientNetCheckPoint, options?: EfficientNetCheckPointFactoryOptions): Promise<EfficientNetModel>`

Example: to create an efficientnet model you need to pass `EfficientNetCheckPoint`
(available checkpoint [B0..B7]) each one of them represent different model

```javascript
const {
  EfficientNetCheckPointFactory,
  EfficientNetCheckPoint
} = require("node-efficientnet");

const model = await EfficientNetCheckPointFactory.create(
  EfficientNetCheckPoint.B7
);

const path2image = "...";

const topResults = 5;

const result = await model.inference(path2image, {
  topK: topResults,
  locale: "zh"
});
```

Of course, you can use local model file to speed up loading

You can download model file from [efficientnet-tensorflowjs-binaries](https://github.com/ntedgi/efficientnet-tensorflowjs-binaries), please keep the directory structure consistent, just like:

```
local_model
  └── B0
    ├── group1-shard1of6.bin
    ├── group1-shard2of6.bin
    ├── group1-shard3of6.bin
    ├── group1-shard4of6.bin
    ├── group1-shard5of6.bin
    ├── group1-shard6of6.bin
    └── model.json
```

```javascript
const path = require("path");
const {
  EfficientNetCheckPointFactory,
  EfficientNetCheckPoint
} = require("node-efficientnet");

const model = await EfficientNetCheckPointFactory.create(
  EfficientNetCheckPoint.B7,
  {
    localModelRootDirectory: path.join(__dirname, "local_model")
  }
);

const path2image = "...";

const topResults = 5;

const result = await model.inference(path2image, {
  topK: topResults,
  locale: "zh"
});
```
#

## Examples

download files from remote and predict using model

```js
const fs = require("fs");
const nodeFetch = require("node-fetch");

const {
  EfficientNetCheckPointFactory,
  EfficientNetCheckPoint
} = require("node-efficientnet");

const images = ["car.jpg", "panda.jpg"];
const imageDir = "./samples";
const imageDirRemoteUri =
  "https://raw.githubusercontent.com/ntedgi/node-EfficientNet/main/samples";

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}

async function download(image, cb) {
  const response = await nodeFetch.default(`${imageDirRemoteUri}/${image}`);
  const buffer = await response.buffer();
  fs.writeFile(`${imageDir}/${image}`, buffer, cb);
}

EfficientNetCheckPointFactory.create(EfficientNetCheckPoint.B2)
  .then((model) => {
    images.forEach(async (image) => {
      await download(image, () => {
        model.inference(`${imageDir}/${image}`).then((result) => {
          console.log(result.result);
        });
      });
    });
  })
  .catch((e) => {
    console.error(e);
  });
```

output :

```js
[
  { label: "sports car, sport car", precision: 88.02440940394301 },
  {
    label: "racer, race car, racing car",
    precision: 6.647441678387659
  },
  { label: "car wheel", precision: 5.3281489176693295 }
][
  ({
    label: "giant panda, panda, panda bear, coon bear, Ailuropoda melanoleuca",
    precision: 83.60747593436018
  },
  { label: "skunk, poleca", precision: 11.61300759424677 },
  {
    label: "hog, pig, grunter, squealer, Sus scrofa",
    precision: 4.779516471393051
  })
];
```
#

## About EfficientNet Models

EfficientNets rely on AutoML and compound scaling to achieve superior performance without compromising resource efficiency. The [AutoML Mobile framework](https://ai.googleblog.com/2018/08/mnasnet-towards-automating-design-of.html) has helped develop a mobile-size baseline network, **EfficientNet-B0**, which is then improved by the compound scaling method to obtain EfficientNet-B1 to B7.

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

#

EfficientNets achieve state-of-the-art accuracy on ImageNet with an order of magnitude better efficiency:

- In high-accuracy regime, EfficientNet-B7 achieves the state-of-the-art 84.4% top-1 / 97.1% top-5 accuracy on ImageNet with 66M parameters and 37B FLOPS. At the same time, the model is 8.4x smaller and 6.1x faster on CPU inference than the former leader, [Gpipe](https://arxiv.org/abs/1811.06965).

- In middle-accuracy regime, EfficientNet-B1 is 7.6x smaller and 5.7x faster on CPU inference than [ResNet-152](https://arxiv.org/abs/1512.03385), with similar ImageNet accuracy.

- Compared to the widely used [ResNet-50](https://arxiv.org/abs/1512.03385), EfficientNet-B4 improves the top-1 accuracy from 76.3% of ResNet-50 to 82.6% (+6.3%), under similar FLOPS constraints.
#

## Models

The performance of each model variant using the pre-trained weights converted from checkpoints provided by the authors is as follows:

| Architecture   | @top1\* Imagenet | @top1\* Noisy-Student |
| -------------- | :--------------: | :-------------------: |
| EfficientNetB0 |      0.772       |         0.788         |
| EfficientNetB1 |      0.791       |         0.815         |
| EfficientNetB2 |      0.802       |         0.824         |
| EfficientNetB3 |      0.816       |         0.841         |
| EfficientNetB4 |      0.830       |         0.853         |
| EfficientNetB5 |      0.837       |         0.861         |
| EfficientNetB6 |      0.841       |         0.864         |
| EfficientNetB7 |      0.844       |         0.869         |

**\*** - topK accuracy score for converted models (imagenet `val` set)

---
```ts
if (this.repo.isAwesome || this.repo.isHelpful) {
  Star(this.repo);
}
```
