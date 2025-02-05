import prisma from "@/libs/prisma";
import { ResponseError, ResponseSuccess } from "@/libs/templates";

export async function POST(req: Request) {
  try {
    const { projectId, uid } = await req.json();
    console.log("Received data:", projectId, uid);

    const result = await prisma.projectMember.findFirst({
      where: {
        projectId: projectId,
        userId: uid,
      },
    });

    return ResponseSuccess(200, "Member found!", { result });
  } catch (error) {
    console.error("Error creating project:", error);
    if ((error as Error).message === "User not found") {
      return ResponseError(404, "User not found", null);
    }
    return ResponseError(500, "Internal Server Error", null);
  }
}
