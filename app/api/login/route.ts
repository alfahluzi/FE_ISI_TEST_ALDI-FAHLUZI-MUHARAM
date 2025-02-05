import prisma from "@/libs/prisma";
import { ResponseError, ResponseSuccess } from "@/libs/templates";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET!; // Change this in .env

export async function GET() {
  return ResponseSuccess(200, "Login API", null);
}

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return Response.json(
        {
          message: "Login failed",
          error: "Invalid username or password",
          data: null,
        },
        { status: 401 }
      );
    }

    // Compare password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return Response.json(
        {
          message: "Login failed",
          error: "Invalid username or password",
          data: null,
        },
        { status: 401 }
      );
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    const cookieStore = await cookies();
    cookieStore.set("token", token, { secure: true });
    cookieStore.set("uid", user.id);
    cookieStore.set("username", user.username);
    return ResponseSuccess(200, "Login Successful", { token });
  } catch (error) {
    console.error("Login Error:", error);
    return ResponseError(500, "Internal Server Error", null);
  }
}
