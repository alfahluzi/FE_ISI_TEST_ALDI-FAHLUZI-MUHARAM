import prisma from "@/libs/prisma";
import { ResponseSuccess } from "@/libs/templates";

export async function GET() {
  return ResponseSuccess(200, "Login API", null);
}
