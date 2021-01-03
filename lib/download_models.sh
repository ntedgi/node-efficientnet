#!/bin/bash
set -e
set -x
curl https://tfhub.dev/tensorflow/efficientnet/b0/classification/1?tf-hub-format=compressed --output b0.tgz
curl https://tfhub.dev/tensorflow/efficientnet/b1/classification/1?tf-hub-format=compressed --output b1.tgz
curl https://tfhub.dev/tensorflow/efficientnet/b2/classification/1?tf-hub-format=compressed --output b2.tgz
curl https://tfhub.dev/tensorflow/efficientnet/b3/classification/1?tf-hub-format=compressed --output b3.tgz
curl https://tfhub.dev/tensorflow/efficientnet/b4/classification/1?tf-hub-format=compressed --output b4.tgz
curl https://tfhub.dev/tensorflow/efficientnet/b5/classification/1?tf-hub-format=compressed --output b5.tgz
curl https://tfhub.dev/tensorflow/efficientnet/b6/classification/1?tf-hub-format=compressed --output b6.tgz
curl https://tfhub.dev/tensorfl ow/efficientnet/b7/classification/1?tf-hub-format=compressed --output b1.tgz

