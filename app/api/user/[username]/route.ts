import prisma from "@/libs/prisma";
import { ResponseError, ResponseSuccess } from "@/libs/templates";
import { NextRequest } from "next/server";
type Props = {
  params: Promise<{
    username: string;
  }>;
};
export async function GET(req: NextRequest, props: Props) {
  const { username } = await props.params;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return ResponseError(404, "user not found", null);
  }
  return ResponseSuccess(200, "user retrieved successfully", { user });
}
