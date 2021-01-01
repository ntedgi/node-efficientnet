const {EfficientNetCheckPoint, EfficientNetCheckPointFactory} = require("../index");

test('EfficientNetCheckPointFactory - create checkpoint other from B0 throws not implement yet ', done => {
    [EfficientNetCheckPoint.B1, EfficientNetCheckPoint.B2, EfficientNetCheckPoint.B3, EfficientNetCheckPoint.B4, EfficientNetCheckPoint.B5, EfficientNetCheckPoint.B6, EfficientNetCheckPoint.B7].forEach(checkPoint => {
        EfficientNetCheckPointFactory.create(checkPoint)
            .then(model => {
                done(new Error(`${model} NOT YET IMPLEMENTED`))
            })
            .catch(error => {
                expect(error.message).toBe(`${checkPoint} - Not Implemented Yet!`)
            })
    })
    done()
});


test('EfficientNetCheckPointFactory - create checkpoint B0 without throwing exception', done => {
    EfficientNetCheckPointFactory.create(EfficientNetCheckPoint.B0)
        .then(model => {
            expect(model).toBeDefined()
            expect(model).toHaveProperty("modelPath")
            expect(model).toHaveProperty("imageSize")
            expect(model).toHaveProperty("model")
            done()
        })
        .catch(error => done(error))
});

test('EfficientNetCheckPointFactory - checkpoint B0 should predict panda at top precision without throwing exception', done => {
    EfficientNetCheckPointFactory.create(EfficientNetCheckPoint.B0)
        .then(async model => {
            expect(model).toBeDefined()
            const image = 'samples/panda.jpg'
            model.inference(image).then(predictions => {
                expect(predictions.result[0].label).toEqual('giant panda, panda, panda bear, coon bear, Ailuropoda melanoleuca')
                done()
            })
        })
        .catch(error => done(error))
});

test('EfficientNetCheckPointFactory - checkpoint B0 should predict car at top precision without throwing exception', done => {
    EfficientNetCheckPointFactory.create(EfficientNetCheckPoint.B0)
        .then(async model => {
            expect(model).toBeDefined()
            const image = 'samples/car.jpg'
            model.inference(image).then(predictions => {
                expect(predictions.result[0].label).toEqual('sports car, sport car')
                done()
            })
        })
        .catch(error => done(error))
});

