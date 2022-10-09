/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-undef */
import express, { Router } from 'express'
import formidable from 'express-formidable'
import bodyParserErrorHandler from 'express-body-parser-error-handler'

const { urlencoded, json } = express

import {
  EfficientNetCheckPointFactory,
  EfficientNetCheckPoint,
  EfficientNetLableLanguage,
  EfficientNetLanguageProvider,
} from 'node-efficientnet'

const safeGet = (fn, fallBack) => {
  try {
    return fn()
  }
  catch (e) {
    return fallBack
  }
}

const loggerMiddleware = (serverName) => (req, _res, next) => {
  console.info(`${serverName} |  ${req.url}  ${req.method} -- ${new Date()}`)
  next()
}

const initServer = (model, serverName = 'back-end') => {
  const app = express()
  const router = Router()
  app.use(loggerMiddleware(serverName))

  router.post('/api/upload:language', async (req, res) => {
    try {
      const filePath = safeGet(() => req.files.file.path, null)
      if (!filePath) {
        res.status(400)
        res.send({ error: 'should pass file to inference' })
      }
      else {
        const language = req.params.language

        const formattedLanguage = language.toUpperCase()
        const labelLanguage = EfficientNetLableLanguage[EfficientNetLableLanguage[formattedLanguage]]
        const languageProvider = new EfficientNetLanguageProvider(
          labelLanguage)

        //Use other language provider for the model
        await languageProvider.load()
        const result = await model.inference(req.files.file.path,
          languageProvider)

        res.send(result)
      }
    }
    catch (err) {
      console.error(err)
      res.status(500).send('Something went wrong')
    }
  })

  router.get('/api/version', async (req, res) => {
    res.send({ version: '1.0' })
  })

  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use(formidable())
  app.use(bodyParserErrorHandler())
  app.use(router)
  return app
}

const createServer = async () => {
  const model = await EfficientNetCheckPointFactory.create(
    EfficientNetCheckPoint.B7,
  )
  return initServer(model)
}

export { createServer }
