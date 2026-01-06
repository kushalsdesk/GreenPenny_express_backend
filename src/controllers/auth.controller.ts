import type { NextFunction, Request, Response } from "express";
import { ID } from "node-appwrite";
import { adminAccount, sessionAccount } from "../libs/appwrite.js";

export const signUpUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { email, password, name } = req.body;

  try {
    const createUser = await adminAccount.create(
      ID.unique(),
      email,
      password,
      name,
    );
    if (createUser) {
      res.status(201).json({
        success: true,
        message: "User Created with provided credentials",
      });
    }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(400).json({ success: false, error: message });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { email, password } = req.body;

  try {
    //login with credentials
    const session = await sessionAccount.createEmailPasswordSession({
      email,
      password,
    });

    res.cookie(
      `a_session${process.env.EXPRESS_APPWRITE_PROJECT_KEY}`,
      session.secret,
      {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(session.expire),
        path: "/",
      },
    );

    res.status(200).json({
      success: true,
      message: "Auth Session with Email-Password is created",
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(400).json({ success: false, error: message });
  }
};
