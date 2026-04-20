import request from "supertest";
import mongoose from "mongoose";
import { userModel } from "../models/users_model";
import app from "../app";

describe("Users Tests", () => {
  const baseUrl = "/users";

  const testUser = {
    userName: "users_test_user",
    email: "users_test@gmail.com",
    password: "123456",
  };

  let createdUserId: string;

  beforeAll(async () => {
    await userModel.deleteMany({
      $or: [{ email: testUser.email }, { userName: testUser.userName }],
    });
  });

  test("Create user", async () => {
    const res = await request(app).post(baseUrl).send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeDefined();

    createdUserId = res.body._id;
  });

  test("Get all users", async () => {
    const res = await request(app).get(baseUrl);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Get user by id", async () => {
    const res = await request(app).get(`${baseUrl}/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdUserId);
  });

  test("Get current user (me)", async () => {
    const authUser = {
      userName: "me_test_user",
      email: "me_test@gmail.com",
      password: "123456",
    };

    await userModel.deleteMany({
      $or: [{ email: authUser.email }, { userName: authUser.userName }],
    });

    await request(app).post("/auth/register").send(authUser);

    const loginRes = await request(app).post("/auth/login").send({
      email: authUser.email,
      password: authUser.password,
    });

    const res = await request(app)
      .get("/users/me")
      .set("Authorization", "Bearer " + loginRes.body.accessToken);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBeDefined();

    await userModel.deleteMany({
      $or: [{ email: authUser.email }, { userName: authUser.userName }],
    });
  });
  
  afterAll(async () => {
    await userModel.deleteMany({
      $or: [{ email: testUser.email }, { userName: testUser.userName }],
    });

    await mongoose.connection.close();
  });
});
