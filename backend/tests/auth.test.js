jest.setTimeout(20000);
 
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const connectDB = require("../config/db");
require("dotenv").config(); 
beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth API", () => {

  it("should register user successfully", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({
        name: "Test User",
        email: `test${Date.now()}@mail.com`,
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered");
  });

  it("should fail if fields are missing", async () => {
    const res = await request(app)
      .post("/api/register")
      .send({
        email: "fail@test.com"
      });

    expect(res.statusCode).toBe(400);
  });

});
