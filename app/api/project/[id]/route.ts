import prisma from "@/libs/prisma";
import { ResponseError, ResponseSuccess } from "@/libs/templates";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      todos: true,
    },
  });
  if (!project) {
    return ResponseError(404, "Project not found", null);
  }
  return ResponseSuccess(200, "Project retrieved successfully", { project });
}

export async function POST(req: NextRequest) {
  const { name, id, members, todos } = await req.json();
  const newProject = await prisma.project.create({
    data: {
      name,
      id,
      members,
      todos,
    },
  });

  if (!newProject) {
    return ResponseError(500, "Failed to create project", null);
  }
  return ResponseSuccess(200, "Project created successfully", { newProject });
}
