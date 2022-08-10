import supertest from "supertest";
import app from "../..";
import { resetTable } from "../helpers/prepare";

const request = supertest(app);

describe("Test User Endpoints responses", () => {
  afterAll(async (): Promise<void> => {
    await resetTable("users");
  });

  let token: string;

  it("POST /user should create new user and return status code 201", async (): Promise<void> => {
    const data: object = {
      firstname: "abc",
      lastname: "cba",
      password: "12345",
    };
    const response = await request.post("/user").send(data);
    token = response.body.token;
    expect(response.status).toBe(201);
    expect(response.body.result).toEqual({
      id: 1,
      firstname: "abc",
      lastname: "cba",
    });
  });

  it("GET /user should return [] of users and return status code 200", async (): Promise<void> => {
    const response = await request
      .get("/user")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        firstname: "abc",
        lastname: "cba",
      },
    ]);
  });

  it("GET /user/:id should return user of given id and return status code 200", async (): Promise<void> => {
    const response = await request
      .get("/user/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      firstname: "abc",
      lastname: "cba",
    });
  });
});
