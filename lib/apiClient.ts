import axios from "axios";
import "dotenv/config";

export const apiClient = axios.create({
  baseURL: process.env.JIRA_HOST,
  headers: {
    Authorization: `Basic ${Buffer.from(
      `${process.env.USER_EMAIL}:${process.env.TOKEN}`
    ).toString("base64")}`,
    Accept: "application/json",
  },
});
