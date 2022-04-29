import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { getRepository, MoreThanOrEqual } from "typeorm";
import { Token } from "../entities/token.entity";
import { User } from "../entities/user.entity";

/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Use to create a new user
 *     produces: ['application/json']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name
 *                 example: Leanne Graham
 *               email:
 *                 type: string
 *                 description: User email address
 *                 example: leanne.graham@gmail.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Server error while creating new user
 */
export const Register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await getRepository(User)
    .save({
      name,
      email,
      password: await bcryptjs.hash(password, 12),
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: err.message || "Server error while creating new user",
      });
    });

  res.status(200).send(user);
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Use to login a user
 *     produces: ['application/json']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email address
 *                 example: leanne.graham@gmail.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Success response (JWT access token)
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Invalid credentials
 *       500:
 *         description: Server error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Server error while logging in user
 */
export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getRepository(User).findOne({ email });

  if (!user)
    return res.status(400).send({
      message: "Invalid credentials",
    });

  if (!(await bcryptjs.compare(password, user.password)))
    return res.status(400).send({
      message: "Invalid credentials",
    });

  const refreshToken = sign(
    {
      id: user.id,
    },
    "refresh_secret",
    { expiresIn: "7d" }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  const expired_at = new Date();
  expired_at.setDate(expired_at.getDate() + 7);

  await getRepository(Token).save({
    userId: user.id,
    token: refreshToken,
    expired_at,
  });

  const token = sign(
    {
      id: user.id,
    },
    "access_secret",
    { expiresIn: "7d" }
  );

  res.status(200).send({
    token,
  });
};

/**
 * @swagger
 * /auth/user:
 *   get:
 *     description: Use to login as a user
 *     produces: ['application/json']
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: UnAuthenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: UnAuthenticated
 */
export const CheckAuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const accessToken = req.header("Authorization")?.split(" ")[1] || "";

    const payload: any = verify(accessToken, "access_secret");

    if (!payload)
      return res.status(401).send({
        message: "unauthenticated",
      });

    const user = await getRepository(User).findOne(payload.id);

    if (!user)
      return res.status(401).send({
        message: "unauthenticated",
      });

    const { password, ...data } = user;

    res.status(200).send(data);
  } catch (e) {
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
};

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     description: Use to refresh the access token of a user
 *     produces: ['application/json']
 *     responses:
 *       200:
 *         description: Success response (JWT access token)
 *       401:
 *         description: UnAuthenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: UnAuthenticated
 */
export const Refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies["refreshToken"];

    const payload: any = verify(refreshToken, "refresh_secret");

    if (!payload)
      return res.status(401).send({
        message: "unauthenticated",
      });

    const dbToken = await getRepository(Token).findOne({
      userId: payload.id,
      expired_at: MoreThanOrEqual(new Date()),
    });

    if (!dbToken)
      return res.status(401).send({
        message: "unauthenticated",
      });

    const token = sign(
      {
        id: payload.id,
      },
      "access_secret",
      { expiresIn: "7d" }
    );

    res.status(200).send({
      token,
    });
  } catch (e) {
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
};

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     description: Use to logout a user
 *     produces: ['application/json']
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: success
 *       500:
 *         description: Server error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Server error while logging out user
 */
export const Logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies["refreshToken"];

  await getRepository(Token)
    .delete({ token: refreshToken })
    .then(() => {
      res.cookie("refreshToken", "", { maxAge: 0 });

      res.status(200).send({
        message: "success",
      });
    })
    .catch((err: Error) => {
      res.status(500).send({
        message: err.message || "Server error while logging out user",
      });
    });
};
