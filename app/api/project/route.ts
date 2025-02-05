import prisma from "@/libs/prisma";
import { ResponseError, ResponseSuccess } from "@/libs/templates";

export async function POST(req: Request) {
  try {
    const { name, members } = await req.json();

    const newProject = await prisma.$transaction(async (pr) => {
      const newProject = await pr.project.create({
        data: { name },
      });

      for (const member of members) {
        const user = await pr.user.findUnique({
          where: { username: member.username },
        });

        if (!user || !member.role) {
          throw new Error("User not found");
        }

        await pr.projectMember.create({
          data: {
            projectId: newProject.id,
            userId: user.id,
            role: member.role,
          },
        });
      }

      return newProject;
    });

    return ResponseSuccess(200, "Project created successfully", { newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    if ((error as Error).message === "User not found") {
      return ResponseError(404, "User not found", null);
    }
    return ResponseError(500, "Internal Server Error", null);
  }
}
