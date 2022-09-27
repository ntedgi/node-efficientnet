/* eslint-disable no-undef */
import request from "supertest";
import { createServer } from "../server.js";
const path = require("path");

let app = null;
beforeAll(async (done) => {
    app = await createServer();
    done();
}, 60000);

describe("Post Endpoints", () => {
    it("should predict simple gold fish", async (done) => {
        jest.setTimeout(60000);
        const filePath = path.join(__dirname, "fish.jpg");
        const res = await request(app)
            .post("/api/upload/english")
            .attach("file", filePath)
            .expect(200)
            .then((output, err) => {
                const expectedLabel = "goldfish, Carassius auratus"
                if (output) {
                    const { result } = output.body;
                    expect(result[0].label).toEqual(expectedLabel)
                    done()
                }
                else {
                    done(err)
                }
            })
            .catch((err, res) => {
                done(err);
            });
    });
  it("should predict simple gold fish in spanish", async (done) => {
    jest.setTimeout(60000);
    const filePath = path.join(__dirname, "fish.jpg");
    const res = await request(app)
    .post("/api/upload/spanish")
    .attach("file", filePath)
    .expect(200)
    .then((output, err) => {
      const expectedLabel = "pez dorado, Carassius auratus"
      if (output) {
        const { result } = output.body;
        expect(result[0].label).toEqual(expectedLabel)
        done()
      }
      else {
        done(err)
      }
    })
    .catch((err, res) => {
      done(err);
    });
  });
    it("sanity test server/version", async (done) => {
        const res = await request(app)
            .get("/api/version/")
            .expect(200)
            .then((response) => {
                const version = response.body;
                done();
            })
            .catch((err, res) => {
                done(err);
            });
    });
});
