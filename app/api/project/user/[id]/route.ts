import prisma from "@/libs/prisma";
import { ResponseError, ResponseSuccess } from "@/libs/templates";
import { NextRequest } from "next/server";
type Props = {
  params: Promise<{
    id: string;
  }>;
};
export async function GET(req: NextRequest, props: Props) {
  const { id } = await props.params;
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
