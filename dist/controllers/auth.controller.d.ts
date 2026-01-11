import type { NextFunction, Request, Response } from "express";
export declare const signUpUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const loginUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const checkCurrentSession: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const logoutUser: (req: Request, res: Response) => Promise<void>;
export declare const initiateOAuth: (req: Request, res: Response) => Promise<void>;
export declare const handleOAuthSuccess: (req: Request, res: Response) => Promise<void>;
export declare const handleOAuthFailure: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map