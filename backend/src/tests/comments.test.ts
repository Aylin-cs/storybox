import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import { postModel } from "../models/posts_model";
import { commentModel } from "../models/comments_model";

describe("Comments Tests", () => {
  const baseUrl = "/comments";

  let postId: string;
  let token: string;
  let commentId: string;

  beforeAll(async () => {
    await postModel.deleteMany({});
    await commentModel.deleteMany({});

    const user = {
      userName: "comment_user",
      email: "comment@gmail.com",
      password: "123456",
    };

    await request(app).post("/auth/register").send(user);

    const loginRes = await request(app).post("/auth/login").send({
      email: user.email,
      password: user.password,
    });

    token = loginRes.body.accessToken;

    const postRes = await request(app)
      .post("/posts")
      .set("Authorization", "Bearer " + token)
      .send({ content: "Post for comments" });

    postId = postRes.body._id;
  });

  test("Create comment", async () => {
    const res = await request(app)
      .post(baseUrl)
      .set("Authorization", "Bearer " + token)
      .send({
        postId,
        content: "Test comment",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeDefined();

    commentId = res.body._id;
  });

  test("Get comments by postId", async () => {
    const res = await request(app).get(`${baseUrl}?postId=${postId}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Get comment by id", async () => {
    const res = await request(app).get(`${baseUrl}/${commentId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(commentId);
  });

  afterAll(async () => {
    await postModel.deleteMany({});
    await commentModel.deleteMany({});
    await mongoose.connection.close();
  });
});
