import prisma from "@/libs/prisma";
import { ResponseError, ResponseSuccess } from "@/libs/templates";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return ResponseError(404, "user not found", null);
  }
  return ResponseSuccess(200, "user retrieved successfully", { user });
}
