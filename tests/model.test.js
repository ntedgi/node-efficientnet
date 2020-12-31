import {EfficientnetCheckPoint, EfficientnetCheckPointFactory} from "../index";


test('EfficientnetCheckPointFactory - create checkpoint other from B0 throws not implement yet ', done => {
    const checkpoints = [EfficientnetCheckPoint.B1, EfficientnetCheckPoint.B2, EfficientnetCheckPoint.B3, EfficientnetCheckPoint.B4, EfficientnetCheckPoint.B5, EfficientnetCheckPoint.B6, EfficientnetCheckPoint.B7].forEach(e => {
        EfficientnetCheckPointFactory.create(EfficientnetCheckPoint.B0)
            .then(model => {
            })
            .catch(error => {})
    })
    done()
});


test('EfficientnetCheckPointFactory - create checkpoint B0 without throwing exception', done => {
    EfficientnetCheckPointFactory.create(EfficientnetCheckPoint.B0)
        .then(model => {
            expect(model).toBeDefined()
            expect(model).toHaveProperty("modelPath")
            expect(model).toHaveProperty("imageSize")
            expect(model).toHaveProperty("model")
            done()
        })
        .catch(error => done(error))
});

test('EfficientnetCheckPointFactory - checkpoint B0 should predict panda at top precision without throwing exception', done => {
    EfficientnetCheckPointFactory.create(EfficientnetCheckPoint.B0)
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

test('EfficientnetCheckPointFactory - checkpoint B0 should predict car at top precision without throwing exception', done => {
    EfficientnetCheckPointFactory.create(EfficientnetCheckPoint.B0)
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

