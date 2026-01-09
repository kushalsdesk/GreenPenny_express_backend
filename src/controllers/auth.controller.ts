import type { NextFunction, Request, Response } from "express";
import { ID, OAuthProvider } from "node-appwrite";
import {
  adminAccount,
  sessionAccount,
  sessionClient,
} from "../libs/appwrite.js";

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

    if (!createUser) return

    const session = await adminAccount.createEmailPasswordSession({
      email,
      password,
    });

    res.cookie(
      `a_session${process.env.EXPRESS_APPWRITE_PROJECT_ID}`,
      session.secret,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(session.expire),
        path: "/",
      },
    );

    res.status(201).json({
      success: true,
      message: "User created and logged in successfully",
    });
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
    const session = await adminAccount.createEmailPasswordSession({
      email,
      password,
    });

    res.cookie(
      `a_session${process.env.EXPRESS_APPWRITE_PROJECT_ID}`,
      session.secret,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
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

export const checkCurrentSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const sessionCookie =
      req.cookies[`a_session${process.env.EXPRESS_APPWRITE_PROJECT_ID}`];

    if (!sessionCookie) {
      res.status(401).json({
        success: false,
        error: "No Active session",
      });
      return;
    }

    sessionClient.setSession(sessionCookie);
    const user = await sessionAccount.get();

    res.status(200).json({
      success: true,
      user: {
        id: user.$id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to get current user";
    res.status(401).json({ success: false, error: message });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const sessionCookie =
      req.cookies[`a_session${process.env.EXPRESS_APPWRITE_PROJECT_ID}`];

    if (sessionCookie) {
      sessionClient.setSession(sessionCookie);
      await sessionAccount.deleteSession("current");
    }
    res.clearCookie(`a_session${process.env.EXPRESS_APPWRITE_PROJECT_ID}`);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(400).json({
      success: false,
      error: message,
    });
  }
};
export const initiateOAuth = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const redirectUrl = await adminAccount.createOAuth2Token({
      provider: OAuthProvider.Google,
      success: `${process.env.BACKEND_URL}/api/v1/oauth/success`,
      failure: `${process.env.BACKEND_URL}/api/v1/oauth/failure`,
    });
    res.redirect(redirectUrl);

    res.status(200).json({
      success: true,
      message: "OAuth initiated Properly",
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(400).json({ success: false, error: message });
  }
};

export const handleOAuthSuccess = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId, secret } = req.query;

  try {
    if (typeof userId === "string" && typeof secret === "string") {
      const session = await adminAccount.createSession({
        userId,
        secret,
      });

      res.cookie(
        `a_session${process.env.EXPRESS_APPWRITE_PROJECT_ID}`,
        session.secret,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          expires: new Date(session.expire),
          path: "/",
        },
      );
      res.redirect(`${process.env.FRONTEND_URL}?auth=success`);
    }
    else {
      res.redirect(
        `${process.env.FRONTEND_URL}?auth=failed&error=Invalid OAuth parameters`
      );
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(400).json({ success: false, error: message });
  }
};
export const handleOAuthFailure = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { error } = req.query;

  res.redirect(
    `${process.env.FRONTEND_URL}/login?auth=failed&error=${encodeURIComponent(String(error) || "OAuth authentication failed")}`,
  );
};
