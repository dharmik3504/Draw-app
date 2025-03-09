import express from "express";
import { prisma } from "@repo/db/primsaClient";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { auth } from "./auth";
const app = express();

express.json();

app.get("/", (req, res) => {
  res.json({
    message: "http-server started",
  });
});
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  res.json({
    userId: "123",
  });
});

app.post("/signin", (req, res) => {
  const userId = 1;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  res.json({
    token,
  });
});

app.post("/room", auth, (req, res) => {
  //db

  res.json({
    roomId: 123,
  });
});
app.listen(3001);
