import { Account, Client } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config();

export const adminClient = new Client()
  .setEndpoint(process.env.EXPRESS_APPWRITE_PROJECT_ENDPOINT!)
  .setProject(process.env.EXPRESS_APPWRITE_PROJECT_ID!)
  .setKey(process.env.EXPRESS_APPWRITE_PROJECT_KEY!);

export const sessionClient = new Client()
  .setEndpoint(process.env.EXPRESS_APPWRITE_PROJECT_ENDPOINT!)
  .setProject(process.env.EXPRESS_APPWRITE_PROJECT_ID!);

export const adminAccount = new Account(adminClient);
export const sessionAccount = new Account(sessionClient);
