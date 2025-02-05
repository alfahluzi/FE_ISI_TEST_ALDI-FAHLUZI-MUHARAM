import prisma from "@/libs/prisma";
import { ResponseError, ResponseSuccess } from "@/libs/templates";

export async function POST(req: Request) {
  try {
    const { todo, assignTo, status, details, projectId } = await req.json();

    const newProject = await prisma.$transaction(async (pr) => {
      return await pr.todo.create({
        data: { todo, assignTo, status, details, projectId },
      });
    });

    if (!newProject) {
      return ResponseError(400, "Failed to create project", null);
    }
    return ResponseSuccess(200, "Project Todo created successfully", {
      newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return ResponseError(500, "Internal Server Error", null);
  }
}

export async function PUT(req: Request) {
  try {
    const { id, todo, assignTo, status, details } = await req.json();

    const newProject = await prisma.$transaction(async (pr) => {
      return await pr.todo.update({
        where: { id },
        data: { todo, assignTo, status, details },
      });
    });

    if (!newProject) {
      return ResponseError(400, "Failed to update project", null);
    }
    return ResponseSuccess(200, "Project Todo updated successfully", {
      newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return ResponseError(500, "Internal Server Error", null);
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const newProject = await prisma.$transaction(async (pr) => {
      return await pr.todo.delete({
        where: { id },
      });
    });

    if (!newProject) {
      return ResponseError(400, "Failed to delete project", null);
    }
    return ResponseSuccess(200, "Project Todo deleted successfully", {
      newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return ResponseError(500, "Internal Server Error", null);
  }
}
