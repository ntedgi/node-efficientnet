import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB0
model = EfficientNetB0(weights='imagenet')
#https://storage.googleapis.com/keras-applications/efficientnetb0.h5