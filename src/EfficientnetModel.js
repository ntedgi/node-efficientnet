"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var tf = require("@tensorflow/tfjs-node");
var Jimp = require("jimp");
var EfficientNetResult_1 = require("./EfficientNetResult");
var NUM_OF_CHANNELS = 3;
var EfficientNetModel = /** @class */ (function () {
    function EfficientNetModel(modelPath, imageSize) {
        this.modelPath = modelPath;
        this.imageSize = imageSize;
    }
    EfficientNetModel.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tf.loadGraphModel(this.modelPath)];
                    case 1:
                        model = _a.sent();
                        this.model = model;
                        return [2 /*return*/];
                }
            });
        });
    };
    EfficientNetModel.prototype.createTensor = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var values, i, outShape, imageTensor;
            return __generator(this, function (_a) {
                values = new Float32Array(this.imageSize * this.imageSize * NUM_OF_CHANNELS);
                i = 0;
                image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y) {
                    var pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
                    pixel.r = ((pixel.r - 1) / 127.0) >> 0;
                    pixel.g = ((pixel.g - 1) / 127.0) >> 0;
                    pixel.b = ((pixel.b - 1) / 127.0) >> 0;
                    values[i * NUM_OF_CHANNELS + 0] = pixel.r;
                    values[i * NUM_OF_CHANNELS + 1] = pixel.g;
                    values[i * NUM_OF_CHANNELS + 2] = pixel.b;
                    i++;
                });
                outShape = Array.apply(void 0, [this.imageSize, this.imageSize, NUM_OF_CHANNELS]);
                imageTensor = tf.tensor3d(values, outShape, "float32");
                imageTensor = imageTensor.expandDims(0);
                return [2 /*return*/, imageTensor];
            });
        });
    };
    EfficientNetModel.prototype.cropAndResize = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var width, height, cropPadding, paddedCenterCropSize, offsetHeight, offsetWidth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        width = image.bitmap.width;
                        height = image.bitmap.height;
                        cropPadding = 32;
                        paddedCenterCropSize = ((this.imageSize / (this.imageSize + cropPadding)) *
                            Math.min(height, width)) >>
                            0;
                        offsetHeight = ((height - paddedCenterCropSize + 1) / 2) >> 0;
                        offsetWidth = (((width - paddedCenterCropSize + 1) / 2) >> 0) + 1;
                        return [4 /*yield*/, image.crop(offsetWidth, offsetHeight, paddedCenterCropSize, paddedCenterCropSize)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, image.resize(this.imageSize, this.imageSize, Jimp.RESIZE_BICUBIC)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, image];
                }
            });
        });
    };
    EfficientNetModel.prototype.predict = function (tensor) {
        return __awaiter(this, void 0, void 0, function () {
            var objectArray, values;
            return __generator(this, function (_a) {
                objectArray = this.model.predict(tensor);
                values = objectArray.dataSync();
                return [2 /*return*/, new EfficientNetResult_1["default"](values)];
            });
        });
    };
    EfficientNetModel.prototype.inference = function (imgPath) {
        return __awaiter(this, void 0, void 0, function () {
            var image, tensor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Jimp.read(imgPath)];
                    case 1:
                        image = _a.sent();
                        return [4 /*yield*/, this.cropAndResize(image)];
                    case 2:
                        image = _a.sent();
                        return [4 /*yield*/, this.createTensor(image)];
                    case 3:
                        tensor = _a.sent();
                        return [2 /*return*/, this.predict(tensor)];
                }
            });
        });
    };
    return EfficientNetModel;
}());
exports["default"] = EfficientNetModel;
