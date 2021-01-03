#!/bin/bash
set -e
set -x
tensorflowjs_converter --input_format=tf_saved_model --output_format=tfjs_graph_model --signature_name=serving_default --saved_model_tags=serve efficientnet_b7_classification_1 ./models/B7
