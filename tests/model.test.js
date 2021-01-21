const {
  EfficientNetCheckPoint,
  EfficientNetCheckPointFactory,
} = require("../index");

test("EfficientNetCheckPointFactory - create checkpoint B0 without throwing exception", (done) => {
  EfficientNetCheckPointFactory.create(EfficientNetCheckPoint.B0)
    .then((model) => {
      expect(model).toBeDefined();
      expect(model).toHaveProperty("modelPath");
      expect(model).toHaveProperty("imageSize");
      expect(model).toHaveProperty("model");
      done();
    })
    .catch((error) => done(error));
});

test("EfficientNetCheckPointFactory - checkpoint B0 should predict panda at top precision without throwing exception", (done) => {
  EfficientNetCheckPointFactory.create(EfficientNetCheckPoint.B0)
    .then(async (model) => {
      expect(model).toBeDefined();
      const image = "samples/panda.jpg";
      model.inference(image).then((predictions) => {
        expect(predictions.result[0].label).toEqual(
          "giant panda, panda, panda bear, coon bear, Ailuropoda melanoleuca"
        );
        done();
      });
    })
    .catch((error) => done(error));
});

test("EfficientNetCheckPointFactory - checkpoint B0 should predict car at top precision without throwing exception", (done) => {
  EfficientNetCheckPointFactory.create(EfficientNetCheckPoint.B0)
    .then(async (model) => {
      expect(model).toBeDefined();
      const image = "samples/car.jpg";
      model.inference(image).then((predictions) => {
        expect(predictions.result[0].label).toEqual("sports car, sport car");
        done();
      });
    })
    .catch((error) => done(error));
});


test("EfficientNetCheckPointFactory - checkpoint B0 should return top 5 answers", (done) => {
  EfficientNetCheckPointFactory.create(EfficientNetCheckPoint.B0)
    .then(async (model) => {
      expect(model).toBeDefined();
      const image = "samples/car.jpg";
      model.inference(image,5).then((predictions) => {
        expect(predictions.result[0].label).toEqual("sports car, sport car");
        expect(predictions.result.length).toEqual(5);
        done();
      });
    })
    .catch((error) => done(error));
});
