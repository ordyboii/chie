import { app } from "@/app/_server/router";
import { handle } from "hono/vercel";

export const GET = handle(app);
export const POST = handle(app);
