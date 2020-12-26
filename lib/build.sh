#!/bin/bash
# download model from here
# https://github.com/Callidior/keras-applications/releases/download/efficientnet/efficientnet-b2_weights_tf_dim_ordering_tf_kernels_autoaugment.h5
tensorflowjs_converter --input_format keras efficientnet-b0_weights_tf_dim_ordering_tf_kernels_autoaugment.h5 tfjs