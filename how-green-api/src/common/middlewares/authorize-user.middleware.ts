import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../../entities/user.entity";

export const AuthorizeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.header("Authorization")?.split(" ")[1] || "";

    console.log("accessToken", accessToken);
    const payload: any = verify(accessToken, "access_secret");

    if (!payload)
      return res.status(403).send({
        message: "unauthorized",
      });

    const user = await getRepository(User).findOne(payload.id);

    if (!user)
      return res.status(404).send({
        message: "user_not_found",
      });

    req.userId = user.id;

    next();
  } catch (e) {
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
};
