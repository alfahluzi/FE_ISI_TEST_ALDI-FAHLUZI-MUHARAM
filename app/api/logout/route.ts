import { ResponseSuccess } from "@/libs/templates";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return ResponseSuccess(200, "Logout Success", null);
}
