import request from "supertest";
import mongoose from "mongoose";
import app from "../app";

describe("AI Tests", () => {
  const baseUrl = "/ai";

  test("Generate caption", async () => {
    const authUser = {
      userName: "ai_user",
      email: "ai@gmail.com",
      password: "123456",
    };

    await request(app).post("/auth/register").send(authUser);

    const loginRes = await request(app).post("/auth/login").send({
      email: authUser.email,
      password: authUser.password,
    });

    const res = await request(app)
      .post(`${baseUrl}/caption`)
      .set("Authorization", "Bearer " + loginRes.body.accessToken)
      .send({
        content: "Enjoying a sunny beach day",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.caption).toBeDefined();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});