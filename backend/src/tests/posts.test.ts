import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import { postModel } from "../models/posts_model";

describe("Posts Tests", () => {
  const baseUrl = "/posts";

  beforeAll(async () => {
    await postModel.deleteMany({});
  });

  test("Create post", async () => {
    const authUser = {
      userName: "post_test_user",
      email: "post_test@gmail.com",
      password: "123456",
    };

    await request(app).post("/auth/register").send(authUser);

    const loginRes = await request(app).post("/auth/login").send({
      email: authUser.email,
      password: authUser.password,
    });

    const res = await request(app)
      .post(baseUrl)
      .set("Authorization", "Bearer " + loginRes.body.accessToken)
      .send({
        content: "Test post",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeDefined();
  });

  test("Get all posts", async () => {
    const res = await request(app).get(baseUrl);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Update post", async () => {
    const authUser = {
      userName: "update_user",
      email: "update@gmail.com",
      password: "123456",
    };

    await request(app).post("/auth/register").send(authUser);

    const loginRes = await request(app).post("/auth/login").send({
      email: authUser.email,
      password: authUser.password,
    });

    const createRes = await request(app)
      .post(baseUrl)
      .set("Authorization", "Bearer " + loginRes.body.accessToken)
      .send({ content: "Old content" });

    const postId = createRes.body._id;

    const updateRes = await request(app)
      .put(`${baseUrl}/${postId}`)
      .set("Authorization", "Bearer " + loginRes.body.accessToken)
      .send({ content: "New content" });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.content).toBe("New content");
  });

  test("Delete post", async () => {
    const authUser = {
      userName: "delete_user",
      email: "delete@gmail.com",
      password: "123456",
    };

    await request(app).post("/auth/register").send(authUser);

    const loginRes = await request(app).post("/auth/login").send({
      email: authUser.email,
      password: authUser.password,
    });

    const createRes = await request(app)
      .post(baseUrl)
      .set("Authorization", "Bearer " + loginRes.body.accessToken)
      .send({ content: "To delete" });

    const postId = createRes.body._id;

    const deleteRes = await request(app)
      .delete(`${baseUrl}/${postId}`)
      .set("Authorization", "Bearer " + loginRes.body.accessToken);

    expect(deleteRes.statusCode).toBe(200);
  });

  afterAll(async () => {
    await postModel.deleteMany({});
    await mongoose.connection.close();
  });
});
