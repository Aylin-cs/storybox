import mongoose from "mongoose";
import request from "supertest";
import { userModel } from "../models/users_model";
import app from "../app";

describe("Auth Tests", () => {
  const baseUrl = "/auth";

  const testUser = {
    userName: "auth_test_user",
    email: "auth_test@gmail.com",
    password: "123456",
  };

  beforeAll(async () => {
    await userModel.deleteMany({
      $or: [
        { email: testUser.email },
        { userName: testUser.userName },
      ],
    });
  });

  afterAll(async () => {
  await userModel.deleteMany({
    $or: [
      { email: testUser.email },
      { userName: testUser.userName },
    ],
  });

  await mongoose.connection.close();
});

  test("Register success", async () => {
    const res = await request(app).post(baseUrl + "/register").send(testUser);
    expect(res.statusCode).toBe(201);
  });

  test("Register fail (duplicate)", async () => {
    const res = await request(app).post(baseUrl + "/register").send(testUser);
    expect(res.statusCode).not.toBe(200);
  });

  test("Login success", async () => {
    const res = await request(app).post(baseUrl + "/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
  });

    test("Refresh token success", async () => {
    const loginRes = await request(app).post(baseUrl + "/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    const refreshRes = await request(app).post(baseUrl + "/refresh").send({
      refreshToken: loginRes.body.refreshToken,
    });

    expect(refreshRes.statusCode).toBe(200);
    expect(refreshRes.body.accessToken).toBeDefined();
    expect(refreshRes.body.refreshToken).toBeDefined();
  });

  test("Logout success", async () => {
  const loginRes = await request(app).post(baseUrl + "/login").send({
    email: testUser.email,
    password: testUser.password,
  });

  const logoutRes = await request(app).post(baseUrl + "/logout").send({
    refreshToken: loginRes.body.refreshToken,
  });

  expect(logoutRes.statusCode).toBe(200);
});

  test("Login fail", async () => {
    const res = await request(app).post(baseUrl + "/login").send({
      email: testUser.email,
      password: "wrong",
    });

    expect(res.statusCode).not.toBe(200);
  });
});