/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-undef */
import express, { Router } from 'express'
import bodyParser from 'body-parser'
import formidable from 'express-formidable'
import bodyParserErrorHandler from 'express-body-parser-error-handler'

const { urlencoded, json } = bodyParser

import {
  EfficientNetCheckPointFactory,
  EfficientNetCheckPoint,
  EfficientNetLanguageProvider,
  EfficientNetLableLanguage,
} from 'node-efficientnet'

const initServer = (model) => {

  const app = express()
  const router = Router()
  const serverName = 'back-end'
  app.use((req, res, next) => {
    console.info(`${serverName} |  ${req.url}  ${req.method} -- ${new Date()}`)
    next()
  })

  router.post('/api/upload/:language', async (req, res) => {
    try {
      let result
      const language = req.params.language

      if (!!language) {
        const formattedLanguage = language.toUpperCase()
        const labelLanguage = EfficientNetLableLanguage[EfficientNetLableLanguage[formattedLanguage]]
        const languageProvider = new EfficientNetLanguageProvider(labelLanguage)

        //Use other language provider for the model
        await languageProvider.load()
        result = await model.inference(req.files.file.path,
          languageProvider)
      }

      else {
        result = await model.inference(req.files.file.path)
      }

      res.send(result)
    }
    catch (err) {
      console.error(err)
      res.status(500).send('Something went wrong')
    }
  })

  router.get('/api/languages', async (req, res) => {
    try {
      const languagesEnumKeys = Object.keys(EfficientNetLableLanguage)
      const languagesAmount = languagesEnumKeys.length / 2
      const languagesArr = languagesEnumKeys.slice(languagesAmount)

      const formattedLanguagesArr = languagesArr.map(
        language => language.toLowerCase()).
        map(item => item.charAt(0).toUpperCase() + item.slice(1))

      res.send(formattedLanguagesArr)
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
  return await initServer(model)
}

export { createServer }
