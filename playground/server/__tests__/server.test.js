/* eslint-disable no-undef */
import request from "supertest";
import { createServer } from "../server.js";
import { join } from "path";
import { EfficientNetLableLanguage } from 'node-efficientnet'

let app = null;
beforeAll(async (done) => {
  app = await createServer();
  done();
}, 60000);

describe("Post Endpoints", () => {
  it("/api/upload should throw exception when not passing a file", async (done) => {
    jest.setTimeout(60000);
    const res = await request(app)
      .post("/api/upload/english")
      .expect(400)
      .then((_, err) => {
        if (err) {
          done();
        } else {
          done(err);
        }
      })
      .catch((err, res) => {
        done(err);
      });
  });
  it("should predict simple gold fish", async (done) => {
    jest.setTimeout(60000);
    const filePath = join(__dirname, "fish.jpg");
    await request(app)
      .post("/api/upload/english")
      .attach("file", filePath)
      .expect(200)
      .then((output, err) => {
        const expectedLabel = "goldfish, Carassius auratus";
        if (output) {
          const { result } = output.body;
          expect(result[0].label).toEqual(expectedLabel);
          done();
        } else {
          done(err);
        }
      })
      .catch((err) => {
        done(err);
      });
  });
  it("should predict simple gold fish in spanish", async (done) => {
    jest.setTimeout(60000);
    const filePath = join(__dirname, "fish.jpg");
    await request(app)
      .post("/api/upload/spanish")
      .attach("file", filePath)
      .expect(200)
      .then((output, err) => {
        const expectedLabel = "pez dorado, Carassius auratus";
        if (output) {
          const { result } = output.body;
          expect(result[0].label).toEqual(expectedLabel);
          done();
        } else {
          done(err);
        }
      })
      .catch((err) => {
        done(err);
      });
  });
  it("sanity test server/version", async (done) => {
    await request(app)
      .get("/api/version/")
      .expect(200)
      .then((response) => {
        const version = response.body;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET Endpoints", () => {
  it("/api/languages should return all existing languages", async (done) => {
    jest.setTimeout(60000);
    const res = await request(app)
      .get("/api/languages")
      .expect(200)
      .then((output, err) => {
        if (output) {
          //Expected languages
          const languagesEnumKeys = Object.keys(EfficientNetLableLanguage);
          const languagesAmount = languagesEnumKeys.length / 2;
          const languagesArr = languagesEnumKeys.slice(languagesAmount);

          const expectedLanguagesArr = languagesArr
          .map((language) => language.toLowerCase())
          .map((item) => item.charAt(0).toUpperCase() + item.slice(1));

          //Actual languages
          const { _body : actualLanguagesArr } = output;

          expect(expectedLanguagesArr).toEqual(actualLanguagesArr);
          done();
        } else {
          done(err);
        }
      })
      .catch((err) => {
        done(err);
      });
  });
});
