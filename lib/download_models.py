import sys
import numpy as np
from skimage.io import imread
sys.path.append('..')

from keras.applications.imagenet_utils import decode_predictions
from efficientnet.keras import EfficientNetB0
from efficientnet.keras import center_crop_and_resize, preprocess_input
model = EfficientNetB0(weights='imagenet')

image = imread('../misc/panda.jpg')
image_size = model.input_shape[1]
x = center_crop_and_resize(image, image_size=image_size)
# x = preprocess_input(x)
x = np.expand_dims(x, 0)

y = model.predict(x)
print(decode_predictions(y))

#https://storage.googleapis.com/keras-applications/efficientnetb0.h5
