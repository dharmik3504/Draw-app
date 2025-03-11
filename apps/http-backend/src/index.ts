import express from "express";
import { prisma } from "@repo/db/primsaClient";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { auth } from "./auth";
import {
  CreateUserSchema,
  SigninSchema,
  CreateRommSchema,
} from "@repo/common/types";
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const data = await prisma.user.findMany({});

  res.json({
    data,
  });
});
app.post("/signup", async (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: data,
    });
    return;
  }
  const { username, password, name } = req.body;
  const result = await prisma.user.create({
    data: {
      username,
      password,
      name,
    },
  });
  res.json({
    userId: "123",
  });
});

app.post("/signin", (req, res) => {
  const data = SigninSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "incorrect inputs",
    });
    return;
  }

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
  const data = CreateRommSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "incorrect inputs",
    });
    return;
  }
  res.json({
    roomId: 123,
  });
});
app.listen(3001);
