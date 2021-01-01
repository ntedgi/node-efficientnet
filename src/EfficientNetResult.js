"use strict";
exports.__esModule = true;
var labelsMap = require("../misc/labels_map.json");
var EfficientNetResult = /** @class */ (function () {
    function EfficientNetResult(values) {
        var _this = this;
        this.result = [];
        var arr = Array.from(values);
        var topValues = values.sort(function (a, b) { return b - a; }).slice(0, 3);
        var indexes = topValues.map(function (e) { return arr.indexOf(e); });
        var sum = topValues.reduce(function (a, b) {
            return a + b;
        }, 0);
        indexes.forEach(function (value, index) {
            // @ts-ignore
            _this.result.push({ label: labelsMap[value], precision: topValues[index] / sum * 100 });
        });
    }
    return EfficientNetResult;
}());
exports["default"] = EfficientNetResult;
