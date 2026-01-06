import { Account, Client } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  "EXPRESS_APPWRITE_PROJECT_ENDPOINT",
  "EXPRESS_APPWRITE_PROJECT_ID",
  "EXPRESS_APPWRITE_PROJECT_KEY",
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const adminClient = new Client()
  .setEndpoint(process.env.EXPRESS_APPWRITE_PROJECT_ENDPOINT!)
  .setProject(process.env.EXPRESS_APPWRITE_PROJECT_ID!)
  .setKey(process.env.EXPRESS_APPWRITE_PROJECT_KEY!);

export const sessionClient = new Client()
  .setEndpoint(process.env.EXPRESS_APPWRITE_PROJECT_ENDPOINT!)
  .setProject(process.env.EXPRESS_APPWRITE_PROJECT_ID!);

export const adminAccount = new Account(adminClient);
export const sessionAccount = new Account(sessionClient);
