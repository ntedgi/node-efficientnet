/* eslint-disable no-undef */
import request from "supertest";
import { createServer } from "../server.js";
import { join } from "path";
import { EfficientNetLabelLanguage } from "node-efficientnet";

let app = null;
beforeAll(async (done) => {
  app = await createServer();
  done();
}, 60000);

describe("Get Endpoints", () => {
  it("/api/languages should return all existing languages", async (done) => {
    jest.setTimeout(1000000);
    const res = await request(app)
      .get("/api/languages")
      .expect(200)
      .then((output, err) => {
        if (output) {
          //Expected languages
          const languagesEnumKeys = Object.keys(EfficientNetLabelLanguage);
          const languagesAmount = languagesEnumKeys.length / 2;
          const languagesArr = languagesEnumKeys.slice(languagesAmount);

          const expectedLanguagesArr = languagesArr
            .map((language) => language.toLowerCase())
            .map((item) => item.charAt(0).toUpperCase() + item.slice(1));

          //Actual languages
          const { _body: actualLanguagesArr } = output;

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

describe("Post Endpoints", () => {
  it("should predict simple gold fish", (done) => {
    jest.setTimeout(100000);
    const filePath = join(__dirname, "fish.jpg");
    request(app)
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
  it("should predict simple gold fish in spanish", (done) => {
    jest.setTimeout(100000);
    const filePath = join(__dirname, "fish.jpg");
    request(app)
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
  it("sanity test server/version", (done) => {
    request(app)
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

