#!/bin/bash
# download model from here
https://tfhub.dev/tensorflow/efficientnet/b0/classification/1
tensorflowjs_converter --input_format=tf_saved_model --output_format=tfjs_graph_model --signature_name=serving_default --saved_model_tags=serve efficientnet_b0_classification_1 ./tfjs/web_model