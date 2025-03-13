import express, { ErrorRequestHandler } from "express";
import { prisma } from "@repo/db/client";
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
  const parseddata = CreateUserSchema.safeParse(req.body);
  if (!parseddata.success) {
    res.json({
      message: parseddata,
    });
    return;
  }

  try {
    const { name, password, username } = parseddata.data;

    const result = await prisma.user.create({
      data: {
        email: username,
        // TODO:harh the pw
        password,
        name,
      },
    });
    res.json({
      userId: result.id,
    });
  } catch (e) {
    res.status(401).json({
      message: "user already exist with this username",
    });
  }
});

app.post("/signin", async (req, res) => {
  const parseddata = SigninSchema.safeParse(req.body);
  if (!parseddata.success) {
    res.json({
      message: "incorrect inputs",
    });
    return;
  }
  // comapre the hashes password here
  const { username, password } = parseddata.data;
  const user = await prisma.user.findFirst({
    where: {
      email: username,
      password,
    },
  });
  if (!user) {
    res.status(401).json({
      message: "user does not exist",
    });
    return;
  }
  const token = jwt.sign(
    {
      userId: user?.id,
    },
    JWT_SECRET
  );
  res.json({
    token,
  });
});

app.post("/room", auth, async (req, res) => {
  const parseddata = CreateRommSchema.safeParse(req.body);
  if (!parseddata.success) {
    res.json({
      message: "incorrect inputs",
    });
    return;
  }
  // @ts-ignore added a gobal types updated the reqst obj in express
  const userId = req.userId;

  const { name } = parseddata.data;
  try {
    const response = await prisma.room.create({
      data: {
        adminId: userId,
        slug: name,
      },
    });
    res.json({
      roomId: response.id,
    });
  } catch (e) {
    res.status(411).json({ message: "room already exists with this name" });
  }
});
app.get("/chat/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);
  const message = await prisma.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 50,
  });
  res.json({
    message,
  });
});
app.listen(3001);
