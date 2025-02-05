import prisma from "@/libs/prisma";
import { ResponseError, ResponseSuccess } from "@/libs/templates";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const project = await prisma.project.findMany({
    take: 8,
    where: {
      members: {
        some: {
          userId: id,
        },
      },
    },
  });
  if (!project) {
    return ResponseError(404, "Project not found", null);
  }
  return ResponseSuccess(200, "Project retrieved successfully", { project });
}
